# Portfolio Ika Maria — Week 4

## Refactoring Arsitektur Web: Decoupled Multi-Tier, Dynamic CSR, REST Form, dan Network Performance Profiling


Pada Week 4 dilakukan refactoring dari aplikasi portfolio yang sebelumnya
bersifat statis/monolitik menjadi aplikasi web dengan pendekatan **decoupled
architecture**. Data portfolio dipisahkan ke dalam beberapa sumber JSON,
kemudian diambil secara asynchronous menggunakan Fetch API dan
`async/await`, dirender pada sisi client menggunakan JavaScript, dan
diintegrasikan dengan Universal Dynamic Modal, asynchronous REST form,
localStorage, serta analisis kinerja jaringan melalui Chrome DevTools.

---

# 1. Identitas Mahasiswa

| Informasi | Keterangan |
|---|---|
| Nama | Ika Maria Manurung |
| NIM | 12S24021 |
| Program Studi | S1 Sistem Informasi |
| Institusi | Institut Teknologi Del |
| Semester | 5 |
| Mata Kuliah | Pemrograman dan Pengujian Web (12S3101) |
| Praktikum | Week 4 |
| Branch | `week4-architecture` |

---

# 2. Latar Belakang

Pada Week 3, portfolio website telah berhasil dibangun menggunakan HTML5,
CSS3, Bootstrap 5, dan JavaScript. Namun, data project, informasi profile,
serta elemen modal masih ditulis secara langsung di dalam `index.html`.
Pendekatan tersebut membuat presentation layer dan data layer masih
bergantung satu sama lain.

Pada Week 4, struktur tersebut direfaktor menggunakan pendekatan decoupled.
Konten dipindahkan menjadi sumber data JSON yang terpisah dari HTML.
JavaScript bertindak sebagai pengatur komunikasi antara presentation layer dan
data provider.

Perubahan ini bertujuan untuk menghasilkan aplikasi yang lebih modular,
lebih mudah dipelihara, dan dapat mengubah data tanpa harus menulis ulang
struktur HTML secara keseluruhan.

---

# 3. Tujuan Implementasi Week 4

Implementasi pada Week 4 memiliki beberapa tujuan utama:

1. Memisahkan presentation layer, application logic, dan data layer.
2. Memindahkan data portfolio ke dalam file JSON modular.
3. Mengimplementasikan Dynamic Client-Side Rendering (CSR).
4. Menggunakan Fetch API dan `async/await` untuk pengambilan data.
5. Menangani Loading, Success, Empty, dan Error UI states.
6. Menggunakan satu Universal Dynamic Modal untuk seluruh project.
7. Mengimplementasikan asynchronous HTTP POST pada contact/service form.
8. Menyimpan histori order menggunakan `localStorage`.
9. Menampilkan jumlah order secara dinamis pada badge.
10. Menganalisis performa jaringan menggunakan Chrome DevTools.

---

# 4. Arsitektur Sistem

## 4.1 Konsep Arsitektur

Aplikasi menggunakan pendekatan **decoupled multi-tier architecture** yang
memisahkan tanggung jawab ke dalam beberapa bagian.

### Presentation Tier

Presentation Tier berada pada browser pengguna dan terdiri dari:

- `index.html`
- Bootstrap 5
- Bootstrap Icons
- `custom-style.css`
- `app.js`

Layer ini bertanggung jawab terhadap tampilan, interaksi pengguna,
pengelolaan DOM, filter project, modal, form, dan feedback UI.

### Application / Service Logic Tier

Application / Service Logic menangani proses pengambilan dan pengiriman data.

Komponen utamanya adalah:

- `api-service.js`
- Fetch API
- HTTP POST
- asynchronous request
- error handling

`api-service.js` berfungsi sebagai Data Access Layer sehingga pemanggilan
data tidak langsung dilakukan dari HTML.

### Data Storage / Data Provider Layer

Data portfolio dipisahkan ke dalam:

- `profile.json`
- `projects.json`
- `services.json`

Selain itu, histori pemesanan layanan disimpan menggunakan `localStorage`
pada sisi client.

---

# 5. C4 Container Diagram

```mermaid
flowchart LR

    USER["User / Browser"]

    CDN["Static Server / CDN<br/>GitHub Pages"]

    PRESENTATION["Presentation Tier<br/><br/>index.html<br/>Bootstrap 5<br/>custom-style.css<br/>app.js"]

    SERVICE["Application / Service Logic Tier<br/><br/>api-service.js<br/>Fetch API<br/>HTTP POST"]

    JSON["JSON Data Providers<br/><br/>profile.json<br/>projects.json<br/>services.json"]

    REST["REST API<br/><br/>Mock REST Endpoint<br/>JSONPlaceholder"]

    STORAGE["Client Storage<br/><br/>localStorage"]

    USER --> CDN
    CDN --> PRESENTATION
    PRESENTATION --> SERVICE
    SERVICE --> JSON
    SERVICE --> REST
    SERVICE --> STORAGE