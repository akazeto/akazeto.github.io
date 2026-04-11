const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

// 모달 열 때 top-btn 숨기기
document.querySelectorAll('.image img, .gallery .artwork img').forEach(img => {
    img.onclick = () => {
        modalImg.src = img.src;
        modal.classList.add('active');
        document.getElementById('top-btn').style.display = 'none';  // 추가
    };
});

// 닫기 버튼 또는 배경 클릭 시 닫기
modalClose.onclick = () => {
    modal.classList.remove('active');
    document.getElementById('top-btn').style.display = 'block';  // 추가
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.getElementById('top-btn').style.display = 'block';  // 추가
    }
};

// ESC 키로도 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        document.getElementById('top-btn').style.display = 'block';  // 추가
    }
});