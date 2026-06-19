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