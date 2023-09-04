// Mendapatkan elemen HTML dengan id "princess" dan menyimpannya dalam variabel 'char'
const char = document.getElementById("princess")

// Mendapatkan elemen HTML dengan id "monster" dan menyimpannya dalam variabel 'monster'
const monster = document.getElementById("monster")

// Mendapatkan elemen HTML dengan id "score" dan menyimpannya dalam variabel 'playerScore'
const playerScore = document.getElementById("score")

// Inisialisasi variabel 'score' dengan nilai 0
let score = 0

// Fungsi 'jumlahScore' akan digunakan untuk menambah skor dan memperbarui tampilan skor pada layar
let jumlahScore = () =>{
    score++
    playerScore.innerHTML = `Score : ${score}`
}

// Fungsi 'jump' akan dipanggil ketika pengguna mengklik tombol untuk membuat karakter 'princess' melompat
function jump() {
    // Mengecek apakah 'princess' sedang dalam keadaan "animate" atau tidak
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

// Setiap interval tertentu, kode ini akan memeriksa apakah 'princess' bertabrakan dengan 'monster'
const hitmonster = setInterval(function(){
    // Mendapatkan posisi atas ('top') karakter 'princess' dan posisi kiri ('left') 'monster' dalam pixel
    const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
    const monsterLeft = parseInt(window.getComputedStyle(monster).getPropertyValue("left"))

    // Jika 'monster' berada dalam jarak tertentu dari 'princess' dan kedua elemen bertabrakan
    if(monsterLeft < 48 && monsterLeft > 0 && charTop >= 60) {
        // Menghentikan animasi 'monster' dan menyembunyikannya
        monster.style.animation = "none"
        monster.style.display = "none"
        
        // Menampilkan pesan konfirmasi kepada pengguna dan jika mereka setuju, me-refresh halaman untuk bermain lagi
        if(confirm("Your princess hit the monster, play again?")) {
            window.location.reload()
        }
    }
})
