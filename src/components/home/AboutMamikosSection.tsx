import { ChevronDownIcon } from "@radix-ui/react-icons"
import { PageContainer } from "@/components/AppShell"

const introduction =
  "Mamikos memanfaatkan teknologi untuk berkembang dari aplikasi cari kos menjadi aplikasi yang memudahkan calon anak kos untuk booking properti kos dan juga melakukan pembayaran kos. Saat ini kami memiliki lebih dari 2 juta kamar kos yang tersebar di lebih dari 140 kota di seluruh Indonesia. Mamikos juga menyediakan layanan manajemen properti, bernama Singgahsini dan Apik, untuk menjawab kebutuhan calon penghuni yang menginginkan kos eksklusif atau kos murah. Mamikos berusaha untuk bisa terus menyajikan daftar rumah kos dengan data ketersediaan kamar yang akurat, fasilitas kos terperinci, dilengkapi dengan foto serta detail harga kos, dan kemudahan survei via fitur virtual tour agar calon penghuni mendapatkan kenyamanan dalam proses pencarian dan booking kos."

const features = [
  {
    title: "Fitur Pencarian",
    description:
      "Di kolom pencarian, kamu bisa cari kos di sekitarmu atau kos di seluruh daerah di Indonesia dengan memasukkan keyword, seperti kos dekat Kampus/Universitas di masing-masing kota, cari kos di Jogja, Depok, Jakarta, Surabaya, Bandung, dan kota besar lainnya atau cari kos di sekitar lokasi saya saat ini.",
  },
  {
    title: "Filter Pencarian",
    description:
      "Cari kos berdasarkan fasilitas kos yang kamu mau, lebih mudah dengan filter berdasarkan Kos AC, Kos Kamar mandi dalam, Kos Wifi. Bisa juga pilih kos dengan tipe kos, mulai dari Kos Harian, Kos Bulanan hingga Kos Tahunan. Mau cari Kos Bebas, Kos Pasutri, Kos Putra, Kos Putri, Kos Campur juga bisa.",
  },
  {
    title: "Chat dengan Penyewa",
    description:
      "Terhubung langsung dengan pemilik kos dan bisa bertanya lebih lanjut mengenai info kos melalui fitur chat di Mamikos.",
  },
  {
    title: "Sewa Langsung via Mamikos",
    description:
      "Bisa langsung mengajukan sewa kos di aplikasi atau website Mamikos. Bahkan, kamu bisa mulai sewa kos dari 3 bulan sebelum masuk kosan. Transaksi lebih aman, tanpa takut kamarnya penuh keduluan orang lain.",
  },
  {
    title: "Virtual Tour",
    description:
      "Virtual Tour Mamikos adalah media foto lingkungan kos dalam 360° yang diperuntukkan untuk kamu, para pencari kos, agar dapat mengetahui kondisi lingkungan kos secara detail tanpa harus survei langsung. Fitur ini cocok jadi andalanmu yang butuh kosan tapi tidak punya waktu untuk survei langsung, karena fitur ini menampilkan keadaan kos secara lengkap dari berbagai sudut.",
  },
  {
    title: "Pembayaran via Mamikos",
    description:
      "Bayar kosan anti ribet, cashless, dan jaminan aman, dengan beragam pilihan metode pembayaran. Nikmati promo-promo menarik yang diselenggarakan secara berkala untuk membantu kamu ngekos lebih hemat.",
  },
  {
    title: "MamiPoin",
    description:
      "Sebagai wujud terima kasih, Mamikos menghadirkan program loyalti melalui MamiPoin. Anak kos bisa mendapatkan poin sebagai cashback setiap melakukan pembayaran kos dan dapat dikumpulkan untuk digunakan sebagai tambahan diskon di pembayaran kos selanjutnya. Pemilik kos juga akan mendapatkan MamiPoin setiap melakukan aktivitas di Mamikos dan dapat dikumpulkan untuk ditukar menjadi beragam hadiah menarik atau tambahan diskon di pembayaran paket Mamikos GoldPlus.",
  },
  {
    title: "Kos Review",
    description:
      "Lihat review dari para penghuni kos agar kamu semakin yakin untuk sewa kos. Kamu juga bisa tulis pengalaman kamu selama ngekos untuk menambah info kos tersebut.",
  },
  {
    title: "Favorit",
    description:
      "Ketemu dengan kos idaman, bisa disimpan dulu melalui fitur favorit kos. Kos yang sudah kamu simpan, dapat kamu sewa di kemudian hari.",
  },
] as const

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function FeatureList() {
  return (
    <ol className="space-y-5 text-base leading-7 text-[#303b4a] sm:text-lg sm:leading-8">
      {features.map((feature, index) => (
        <li key={feature.title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[1.5rem_minmax(0,1fr)] sm:gap-x-4">
          <span className="font-bold">{String.fromCharCode(97 + index)}.</span>
          <div>
            <h3 className="font-bold leading-7 sm:leading-8">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function AboutMamikosSection() {
  return (
    <section aria-labelledby="about-mamikos-title" className="bg-white py-10 min-[992px]:bg-[#f5f5f5] sm:py-12">
      <PageContainer>
        <h2 id="about-mamikos-title" className="text-center text-xl font-bold leading-7 tracking-tight text-primary min-[992px]:text-2xl min-[992px]:leading-8 min-[992px]:text-[#303b4a]">
          Mamikos - Aplikasi Anak Kos No. 1 di Indonesia
        </h2>
        <div className="hidden min-[992px]:block">
          <p className="mx-auto mt-6 max-w-[1440px] text-base leading-7 text-[#303b4a] sm:text-lg sm:leading-8">
            {introduction}
          </p>

          <details className="group mx-auto mt-8 max-w-[1440px]">
            <summary
              className={`${focusRing} flex cursor-pointer list-none items-center justify-center gap-2 rounded-md px-3 py-3 text-center text-lg font-bold text-[#303b4a] transition-colors sm:text-2xl [&::-webkit-details-marker]:hidden`}
            >
              <span>Fitur yang dapat dimanfaatkan di Mamikos</span>
              <ChevronDownIcon aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180 sm:size-6" />
            </summary>

            <div className="mt-6 sm:mt-7">
              <FeatureList />
            </div>
          </details>
        </div>

        <div className="mt-4 min-[992px]:hidden">
          <details className="group border-b">
            <summary
              className={`${focusRing} flex w-full cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-lg font-bold text-[#303b4a] [&::-webkit-details-marker]:hidden`}
            >
              <span>Tentang Mamikos</span>
              <ChevronDownIcon aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="pb-5 text-base leading-7 text-[#303b4a]">{introduction}</p>
          </details>

          <details className="group border-b">
            <summary
              className={`${focusRing} flex w-full cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-lg font-bold text-[#303b4a] [&::-webkit-details-marker]:hidden`}
            >
              <span>Fitur yang dapat dimanfaatkan di Mamikos</span>
              <ChevronDownIcon aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-5 pt-4">
              <FeatureList />
            </div>
          </details>
        </div>
      </PageContainer>
    </section>
  )
}
