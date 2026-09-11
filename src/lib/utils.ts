import { cn as mergeClasses, type ClassValue } from "cn"

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(...inputs)
}
