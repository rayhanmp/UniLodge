# UniLodge

## Deskripsi Singkat
UniLodge merupakan perangkat lunak yang berfungsi untuk membantu proses manajemen asrama. UniLodge dapat digunakan oleh _customer_.  UniLodge memfasilitasi usernya untuk melakukan _register_ dan _login_. User dapat mengakses fitur layanan keluhan untuk mengadukan keluhan yang dialami selama berada di lingkungan asrama. User juga dapat memesan makanan, memesan layanan laundry, dan layanan-layanan lainnya seperti parkir, keamanan, dsb.

Sistem diharapkan dapat menjadi **_one-stop solution_** bagi pengguna sebagai penghuni asrama serta menjadi alat bantu manajemen seluruh aspek operasional maupun non operasional asrama bagi pengelola asrama.

## Cara Menjalankan Aplikasi
Pertama, lakukan _clone_ dengan perintah:
```bash
git clone https://gitlab.informatika.org/tubes-rpl-g10/gymmaster.git
```
Unduh versi LTS NodeJS melalui utas [https://nodejs.org/en/](https://nodejs.org/en/), lakukan instalasi, lalu buka _command prompt_ dan berpindahlah ke berkas _repository_ dengan:
```bash
cd gymmaster
``` 
Unduh semua dependensi yang ada dengan perintah:
```bash
npm install
```
Lalu, jalankan perintah berikut:
```bash
npm run dev
````

Buka alamat [http://localhost:3000](http://localhost:3000) dengan aplikasi peramban Anda dan mulailah mencoba fitur Gym Master.

Anda dapat mengubah aplikasi Gym Master dengan membuka berkas `app` lalu mengubah komponen (di berkas `/components`) maupun API (di folder `/api`)

## _Tech Stack_

Program ini ditulis dengan `NextJS` yang merupakan sebuah _full-stack framework_ yang dibangun di atas NodeJS dan ReactJS. Hal ini juga membuat GymMaster memiliki arsitektur monolitik. Proses styling dilakukan dengan `Tailwind CSS` dan pustaka komponen DaisyUI.

Proses penyimpanan data menggunakan DBMS `PostgreSQL` yang di-host oleh Supabase. Bagian _back-end_ berinteraksi dengan basis data menggunakan object-relational-mapper (ORM) bernama `Prisma`. Proses autentikasi ditangani oleh pustaka NextJS bernama Next-Auth.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
