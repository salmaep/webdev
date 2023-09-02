// Mendapatkan elemen HTML dengan id "dino" dan menyimpannya dalam variabel 'char'
const char = document.getElementById("dino")

// Mendapatkan elemen HTML dengan id "cactus" dan menyimpannya dalam variabel 'cactus'
const cactus = document.getElementById("cactus")

// Mendapatkan elemen HTML dengan id "score" dan menyimpannya dalam variabel 'playerScore'
const playerScore = document.getElementById("score")

// Inisialisasi variabel 'score' dengan nilai 0
let score = 0

// Fungsi 'jumlahScore' akan digunakan untuk menambah skor dan memperbarui tampilan skor pada layar
let jumlahScore = () =>{
    score++
    playerScore.innerHTML = `Score : ${score}`
}

// Fungsi 'jump' akan dipanggil ketika pengguna mengklik tombol untuk membuat karakter 'dino' melompat
function jump() {
    // Mengecek apakah 'dino' sedang dalam keadaan "animate" atau tidak
    if(char.classList != "animate") {
        // Jika tidak dalam keadaan "animate", tambahkan kelas "animate" untuk menganimasikan loncatan
        char.classList.add("animate")
    }
    // Setelah 500 milidetik, hapus kelas "animate" untuk mengakhiri animasi loncatan
    setTimeout(function(){
        char.classList.remove("animate")
    }, 500)
    
    // Inisialisasi variabel 'score' lokal dengan nilai 0
    let score = 0

    // Setiap 100 milidetik, panggil fungsi 'jumlahScore' untuk menambah skor
    interval = setInterval(jumlahScore, 100)
}

// Setiap interval tertentu, kode ini akan memeriksa apakah 'dino' bertabrakan dengan 'cactus'
const hitCactus = setInterval(function(){
    // Mendapatkan posisi atas ('top') karakter 'dino' dan posisi kiri ('left') 'cactus' dalam pixel
    const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    // Jika 'cactus' berada dalam jarak tertentu dari 'dino' dan kedua elemen bertabrakan
    if(cactusLeft < 60 && cactusLeft > 0 && charTop >= 60) {
        // Menghentikan animasi 'cactus' dan menyembunyikannya
        cactus.style.animation = "none"
        cactus.style.display = "none"
        
        // Menampilkan pesan konfirmasi kepada pengguna dan jika mereka setuju, me-refresh halaman untuk bermain lagi
        if(confirm("Your dino hit the cactus, play again?")) {
            window.location.reload()
        }
    }
})
