const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

// 모든 .image.artwork img 클릭 시 모달 열기
document.querySelectorAll('.image.artwork img').forEach(img => {
    img.onclick = () => {
        modalImg.src = img.src;
        modal.classList.add('active');
    };
});

// 닫기 버튼 또는 배경 클릭 시 닫기
modalClose.onclick = () => modal.classList.remove('active');
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
};

// ESC 키로도 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
});