# Mamikos Homepage Clone

Submission untuk **Frontend Engineer Technical Test: AI-Assisted Build**. Clone homepage Mamikos menggunakan data mock lokal, tanpa backend atau database.

**Live demo:** [mamikos-clone.yuoibur.workers.dev](https://mamikos-clone.yuoibur.workers.dev)

## Pendekatan & proses

Saya memulai dari inspeksi referensi website dan planning bersama AI, lalu memecah pekerjaan menjadi checkpoint kecil: foundation, shell, mock data, komponen, dan section halaman. Saya menggunakan **Traycer dengan Codex (Luna Max)**, dengan satu coordinator dan tiga agent untuk UI, mock data/state, serta review/QA.

Scope awal mencakup homepage, search overlay, search, profile, favorit, detail kos, dan auth modal. Di tengah pengerjaan, saya membatasi scope menjadi **homepage saja** karena keterbatasan waktu dan resource. Implementasi di luar scope tersebut kemudian dibersihkan.

Hasil AI tidak langsung saya terima: saya membandingkan tampilannya dengan referensi dan memberikan koreksi per bagian, termasuk navbar, footer, dan perilaku search navbar saat scroll. Workflow juga disederhanakan: pemeriksaan visual saya tangani sendiri, sementara AI membantu implementasi, perbaikan, dan pemeriksaan kode/build.

## Stack & keputusan utama

- **Vite, React, TypeScript, Tailwind CSS, dan shadcn/ui**, dengan Embla untuk carousel.
- Komponen reusable dipisahkan per konteks; komposisi homepage ada di `src/pages/HomePage.tsx`.
- Data kos menggunakan mock lokal; aset dikelompokkan berdasarkan kebutuhan seperti brand, ikon, promo, area, dan kampus.
- Fokus akhir pada navbar, hero, carousel promo, daftar kos, area/kampus populer, informasi Mamikos, dan footer.
- Search, profile, favorit, dan detail kos tidak diimplementasikan sebagai halaman aktif. Tombol menuju fitur tersebut hanya menjadi elemen tampilan tanpa navigasi; interaksi lokal seperti carousel dan menu tetap tersedia.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Pemeriksaan dan build:

```bash
npm run typecheck
npm run self-check
node src/components/AppShell.test.mjs
npm run build
```

Proyek ini dibuat untuk keperluan technical test, bukan layanan resmi Mamikos. Identitas visual dan aset referensi tetap milik pemiliknya masing-masing.
