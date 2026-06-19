const topBtn = document.getElementById('top-btn');

if (topBtn) {  // 버튼이 있을 때만 실행
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });
}

document.getElementById('top-btn').addEventListener('click', function () {
    const isMobile = window.innerWidth <= 768;
    window.scrollTo({ top: isMobile ? 400 : 800, behavior: 'smooth' });
});