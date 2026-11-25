document.addEventListener('DOMContentLoaded', () => {
    const heartsBg = document.getElementById('heartsBg');
    const heartEmojis = ['❤️', '💖', '💕', '✨', '🌸'];

    function createHeart() {
        if (!heartsBg) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        const duration = Math.random() * 5 + 5;
        heart.style.animationDuration = duration + 's';
        heartsBg.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }
    setInterval(createHeart, 400);

    const surpriseBtn = document.getElementById('surpriseBtn');
    const secretMessage = document.getElementById('secretMessage');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            // 1. Показываем поздравление
            if (secretMessage) {
                secretMessage.classList.remove('hidden');
            }
            surpriseBtn.innerText = 'С Днём Рождения, Коля! 🎉';

            // 2. Запускаем музыку (если файл song.mp3 есть в папке)
            if (bgMusic) {
                bgMusic.volume = 0.6;
                bgMusic.play().then(() => {
                    if (musicToggle) musicToggle.classList.remove('hidden');
                }).catch((err) => {
                    console.log("Музыка не запустилась (проверь наличие файла song.mp3):", err);
                });
            }

            // 3. Запускаем конфетти (если библиотека загрузилась)
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 140,
                    spread: 90,
                    origin: { y: 0.6 }
                });
            }
        });
    }

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.innerText = '🎵 Пауза';
            } else {
                bgMusic.pause();
                musicToggle.innerText = '🔇 Включить';
            }
        });
    }
});