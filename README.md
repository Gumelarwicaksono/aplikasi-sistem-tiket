## Documentation Sistem Tickets

### Teknologi

    1. Node.js
    2. expressjs
    3. MongoDB

### menjalankan aplikasi !

    1. clone code di https://github.com/Gumelarwicaksono/aplikasi-sistem-tiket.git
    2. jalankan npm install untuk mengintsall seluruh depedensis
    3. jalankan npm start

### Testing Aplikasi Mengunkan postman

#### User Test

    1. Enpoint Register
        - Method POST
        - Akses http://localhost:3000/api/register
        - Data yang dikirim : Body permintaan raw sebagai Json
        {
            "firstName" :"admin",
            "lastName":"admin",
            "email":"admin@example.com",
            "password": "admin",
            "role":"admin"
        }
    2. Enpoint Login
        - Method POST
        - Akses http://localhost:3000/api/login
        - Data yang dikirim : Body permintaan raw sebagai Json
        {
            "email":"admin@example.com",
            "password": "admin" / "user"
        }
    3. Enpoint Me
        - Method GET
        - Akses http://localhost:3000/api/me
        - Data yang dikirim : Authorization dengan bearer token
    4. Enpoint logout
        - Method POST
        - Akses http://localhost:3000/api/logout
        - Data yang dikirim : Authorization dengan bearer token

#### Tickets Test

    1. Enpoint Membuat permintaan Tiket
        - Method POST
        - Akses http://localhost:3000/api/tickets
        - Data yang dikirim : Body permintaan raw sebagai Json
            - category memiliki beberapa list yang bisa di kirim = ['Permintaan', 'Keluhan', 'Masalah Teknis']
            - priority memiliki beberapa params yang dapat dikirim  = ['Biasa', 'Urgent', 'Kritis'],
            {
                "category": "Permintaan",
                "priority": "Biasa",
                "message": "tolong segera di proses"
            }
    2. Enpoint Melihat Semua tiket
        - Method GET
        - Params Ynag bisa dikirim dari url / serch :
            - category =  ['Permintaan', 'Keluhan', 'Masalah Teknis']
            - priority = ['Biasa', 'Urgent', 'Kritis'],
            - status =  ['Menunggu Tindakan', 'Sedang dalam Proses', 'Sedang Direspon', 'Telah Selesai'],
        - Akses get All :  http://localhost:3000/api/tickets
        - dengan params / serch :  http://localhost:3000/api/tickets?category=Keluhan
        ket : harus sudah login dan wajib sebagai Admin
              Data yang dikirim : Authorization dengan bearer token
    3. Enpoint melihat tiket sebagai user yang login
        - Method GET
        - Akses http://localhost:3000/api/tickets/userid
        - Data yang dikirim : Authorization dengan bearer token
    4. Enpoint untuk melihat notifikasi
        - Method GET
        - Akses http://localhost:3000/api/tickets/notif
        -  ket : harus sudah login dan wajib sebagai Admin
              Data yang dikirim : Authorization dengan bearer token

    5. Enpoint untuk mengupdate status tiket menerima permintaan tiket dan membuatkan tiket
        - Method PUT
        - Akses http://localhost:3000/api/tickets/iddaritiket
        -  ket : harus sudah login dan wajib sebagai Admin
              Data yang dikirim : Authorization dengan bearer token
        - Data yang bisa di kirim sebgai params  adalah id tiket dan  dari request body  permintaan raw sebagi Json
            params yang bisa dikirim sebagai status = ['Menunggu Tindakan', 'Sedang dalam Proses', 'Sedang Direspon', 'Telah Selesai'],
            default nilai : "Menunggu Tindakan"
        {
            "status": "Menunggu Tindakan",
        }

#### Pesan Testing

    1. Enpoint kirim pesan
        - Method POST
        - Akses http://localhost:3000/api/pesan
        - Data yang dikirim : Body permintaan raw sebagai Json
        {
            "pesan":"hallo selamat pagi"
        }

    2.  Enpoint melihat pesan - Method GET - Akses http://localhost:3000/api/pesan
    3. Enpoint kirim pesan
            - Method GET
            - Akses http://localhost:3000/api/pesan/notif
            - Data yang dikirim : Authorization dengan bearer token dan harus sebagai admin
