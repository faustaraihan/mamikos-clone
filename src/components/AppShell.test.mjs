import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import ts from "typescript"

// Exercise the actual header effect without a browser or extra test dependencies.
const source = readFileSync(new URL("./AppShell.tsx", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
})
let effect, visible, resize, headerBottom = 105
const observers = []
const hero = {}
const header = { getBoundingClientRect: () => ({ bottom: headerBottom }) }
let resizeDisconnected = false
const exports = {}
runInNewContext(outputText, {
  exports,
  document: { getElementById: (id) => { assert.equal(id, "home-search"); return hero } },
  IntersectionObserver: class {
    constructor(callback, options) { Object.assign(this, { callback, options }); observers.push(this) }
    observe(target) { assert.equal(target, hero) }
    disconnect() { this.disconnected = true }
  },
  ResizeObserver: class {
    constructor(callback) { resize = callback }
    observe(target) { assert.equal(target, header) }
    disconnect() { resizeDisconnected = true }
  },
  require: (name) => {
    if (name === "react") return {
      useEffect: (callback) => { effect = callback },
      useRef: () => ({ current: header }),
      useState: (initial) => [initial, (value) => { visible = value }],
    }
    if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) }
    if (name === "@/lib/utils") return { cn: (...values) => values.filter(Boolean).join(" ") }
    return {}
  },
})
exports.AppShell({}).props.children[0].type()
const cleanup = effect()
assert.equal(observers[0].options.rootMargin, "-105px 0px 0px 0px")
observers[0].callback([{ isIntersecting: true }])
assert.equal(visible, false)
observers[0].callback([{ isIntersecting: false }])
assert.equal(visible, true)
observers[0].callback([{ isIntersecting: true }])
assert.equal(visible, false)
headerBottom = 57
resize()
assert.equal(observers[0].disconnected, true)
assert.equal(observers[1].options.rootMargin, "-57px 0px 0px 0px")
cleanup()
assert.equal(observers[1].disconnected, true)
assert.equal(resizeDisconnected, true)
console.log("Navbar search visibility: ok")
