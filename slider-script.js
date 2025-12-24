const slide = document.querySelector('.slide');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const images = document.querySelectorAll('.image');

let counter = 0;
const size = 100; // Kita gunakan persentase (100%)

arrowRight.addEventListener('click', () => {
    if (counter >= images.length - 1) {
        counter = 0; // Kembali ke gambar pertama jika sudah di akhir
    } else {
        counter++;
    }
    updateSlider();
});

arrowLeft.addEventListener('click', () => {
    if (counter <= 0) {
        counter = images.length - 1; // Ke gambar terakhir jika diklik di awal
    } else {
        counter--;
    }
    updateSlider();
});

function updateSlider() {
    slide.style.transform = 'translateX(' + (-size * counter) + '%)';
}