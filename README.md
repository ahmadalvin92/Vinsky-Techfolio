# Ahmad Alvin Griffin — Tech Portfolio

Portfolio personal yang menampilkan profil, keahlian, pengalaman, proyek, dan kontak Ahmad Alvin Griffin. Konten publik dapat tetap tampil menggunakan data cadangan, sementara administrator dapat memperbarui konten melalui panel privat.

## Fitur

- Halaman portofolio responsif dengan profil, keahlian, pengalaman, proyek, dan kontak.
- Desain modern berbasis Next.js App Router dan React.
- Panel admin di `/admin` untuk mengelola konten portofolio.
- Login admin melalui Supabase Authentication.
- Data portofolio tersimpan di Supabase Postgres.
- Fallback data agar halaman publik tetap dapat dibuka bila Supabase belum dikonfigurasi.
- Siap dideploy ke Vercel.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Bahasa | TypeScript, JavaScript, CSS |
| Framework | Next.js 15 dan React 19 |
| Backend/data | Supabase Auth dan Supabase Postgres |
| Styling | CSS global dan komponen React |
| Deployment | Vercel atau server Node.js |

## Struktur proyek

```text
Vinsky-Techfolio/
├── app/                 # Route, halaman publik, dan dashboard admin
├── components/          # Komponen antarmuka yang dapat digunakan ulang
├── lib/                 # Konfigurasi Supabase, tipe data, dan fallback content
├── public/assets/       # Foto profil dan CV untuk halaman publik
├── supabase/schema.sql  # Skema database Supabase
├── .env.example         # Contoh konfigurasi environment
└── package.json
```

## Prasyarat

- Node.js 20 LTS atau lebih baru
- npm 10 atau lebih baru
- Akun dan project Supabase (opsional untuk mode fallback, wajib untuk admin dan data dinamis)

## Instalasi lokal

1. Clone repository dan masuk ke folder proyek.

   ```bash
   git clone https://github.com/ahmadalvin92/Vinsky-Techfolio.git
   cd Vinsky-Techfolio
   ```

2. Instal dependency.

   ```bash
   npm install
   ```

3. Buat file konfigurasi lokal.

   ```bash
   cp .env.example .env.local
   ```

4. Isi `.env.local` dengan kredensial project Supabase.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ADMIN_EMAIL=your-admin-email@example.com
   ```

   Jangan pernah mengunggah `.env.local` atau API key rahasia ke repository.

5. Jalankan aplikasi.

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`.

## Konfigurasi Supabase dan admin

1. Buat project baru di Supabase.
2. Buka **SQL Editor**, lalu jalankan file `supabase/schema.sql`.
3. Di **Authentication > Users**, buat user admin dengan email yang sama seperti `ADMIN_EMAIL`.
4. Pastikan provider Email/Password aktif.
5. Buka `http://localhost:3000/admin` dan masuk memakai akun admin tersebut.

Tanpa environment variable Supabase, tampilan publik tetap memakai data fallback. Fitur login dan perubahan konten tidak akan aktif sampai konfigurasi Supabase lengkap.

## Perintah yang tersedia

```bash
npm run dev      # Menjalankan server pengembangan
npm run build    # Membuat build produksi
npm run start    # Menjalankan build produksi
npm run lint     # Memeriksa kualitas kode
```

## Deployment

Untuk Vercel, impor repository ini sebagai project baru, lalu masukkan tiga environment variable yang sama seperti `.env.local` pada pengaturan project. Jalankan `npm run build` secara lokal terlebih dahulu untuk memastikan build produksi berhasil.

## Keamanan

- Gunakan kata sandi admin yang kuat.
- Batasi `ADMIN_EMAIL` hanya untuk akun yang diizinkan.
- Simpan key Supabase hanya di environment variable platform deployment.
- Pastikan RLS/policy pada Supabase sesuai dengan kebutuhan data sebelum aplikasi digunakan publik.
