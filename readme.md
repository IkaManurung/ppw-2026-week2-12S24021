# Portfolio Ika Maria

Halaman portofolio personal yang merupakan hasil **refactoring dan pengembangan dari Tugas Minggu 2** menggunakan **Bootstrap 5.3** dan **Advanced Custom CSS**.

Project ini dibuat untuk tugas mandiri **Minggu 03: Penguasaan CSS Lanjutan, CSS Selector Spesifisitas, dan Integrasi Bootstrap 5** pada mata kuliah **Pemrograman dan Pengujian Web (12S3101)**, Institut Teknologi Del.

---

## Identitas

- **Nama:** Ika Maria Manurung
- **NIM:** 12S24021
- **Program Studi:** S1 Sistem Informasi
- **Perguruan Tinggi:** Institut Teknologi Del
- **Mata Kuliah:** Pemrograman dan Pengujian Web (12S3101)
- **Praktikum:** Minggu 03
- **Branch:** `week3-bootstrap`

---

## Live Demo

**GitHub Pages:**

https://USERNAME.github.io/ppw-2026-week2-NIM/

> Ganti `USERNAME` dan `NIM` dengan alamat GitHub Pages yang digunakan pada repository.

---

## Tentang Project

Project ini merupakan kelanjutan dari **Portfolio Minggu 2** yang sebelumnya dibangun menggunakan HTML5 semantik dan CSS murni.

Pada Minggu 3, halaman portfolio direfactor dengan mengintegrasikan **Bootstrap 5.3** sebagai CSS framework dan tetap menggunakan **Custom CSS** sebagai override untuk mempertahankan identitas visual personal.

Refactoring dilakukan untuk meningkatkan:

- responsivitas halaman;
- konsistensi layout;
- penggunaan komponen UI;
- interaktivitas halaman;
- modernisasi formulir;
- pemeliharaan kode CSS;
- dan pengalaman pengguna pada berbagai ukuran perangkat.

---

## Perubahan Week 2 → Week 3

| Aspek | Sebelum – Week 2 | Sesudah – Week 3 |
|---|---|---|
| Framework | HTML5 + CSS murni | Bootstrap 5.3 + Custom CSS |
| Layout | CSS Grid dan Flexbox | Bootstrap Container, Row, dan Column |
| Navbar | Navbar CSS custom | Bootstrap Responsive Navbar + Collapse |
| Responsive Design | Media Query CSS | Bootstrap Responsive Grid + Custom Media Query |
| Project | Tampilan project berbasis CSS | Bootstrap Cards dengan responsive grid |
| Detail Project | Informasi pada halaman utama | Bootstrap Modal Dialog |
| Badge | CSS custom | Bootstrap Badge + Custom Styling |
| Form | Form HTML/CSS custom | Bootstrap Form Components |
| Input | Input standar | Floating Labels dan Input Groups |
| Select | Select HTML | Bootstrap Form Select |
| Validasi | Native HTML validation | Bootstrap Visual Validation Feedback |
| Tema | CSS custom | Bootstrap + CSS Custom Properties |
| Interaksi | Hover dan transition CSS | Bootstrap Components + Custom Micro-interactions |
| Ikon | Ikon custom | Bootstrap Icons |
| Deployment | GitHub Pages | GitHub Pages pada branch Week 3 |

---

## Isi Halaman

### 1. Home

Bagian Home berisi:

- identitas singkat;
- nama pemilik portfolio;
- deskripsi singkat;
- foto profil;
- Call-to-Action (CTA);
- dan navigasi menuju bagian portfolio.

### 2. About

Bagian About menjelaskan profil singkat dan proses pembelajaran selama menjadi mahasiswa Sistem Informasi.

### 3. Academic Journey

Bagian Academic Journey menampilkan empat project akademik:

1. **CendraMatak**
2. **Laundry Del**
3. **Ma-U**
4. **Imunify**

Project ditampilkan menggunakan Bootstrap Card dalam responsive grid.

### 4. Contact

Bagian Contact menyediakan formulir interaktif dengan:

- Floating Labels;
- Input Groups;
- Email input;
- Phone input;
- Select category;
- Semester input;
- Date input;
- Communication preference;
- Textarea;
- Checkbox persetujuan;
- Validasi visual.

---

## Fitur Teknis Week 3

### Bootstrap 5.3

Project menggunakan Bootstrap 5.3 melalui CDN:

- Bootstrap CSS;
- Bootstrap JavaScript Bundle;
- Bootstrap Icons.

Bootstrap CSS dimuat terlebih dahulu dan Custom CSS dimuat setelahnya untuk melakukan styling dan override tampilan.

### Responsive Grid

Portfolio menggunakan sistem responsive grid Bootstrap:

```html
row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4