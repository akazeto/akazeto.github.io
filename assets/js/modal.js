const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const topBtn = document.getElementById('top-btn'); // null이어도 안전하게

function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    if (topBtn) topBtn.style.display = 'none';
}

function closeModal() {
    modal.classList.remove('active');
    if (topBtn) topBtn.style.display = 'block';
}

// gallery .artwork (artwork.html, others.html)
document.querySelectorAll('.gallery .artwork').forEach(artwork => {
    artwork.addEventListener('click', () => {
        const img = artwork.querySelector('img');
        if (img) openModal(img.src);
    });
});

// index.html 슬라이더 카드
document.querySelectorAll('.card.artwork img').forEach(img => {
    img.addEventListener('click', () => openModal(img.src));
});

// commission_index.html 티어 이미지
document.querySelectorAll('.tier-card-images img').forEach(img => {
    img.addEventListener('click', () => openModal(img.src));
    img.style.cursor = 'pointer';
});

// 닫기 버튼
modalClose.onclick = () => closeModal();

// 배경 클릭 닫기
modal.onclick = (e) => {
    if (e.target === modal) closeModal();
};

// ESC 키 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// 우클릭 방지
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

// 드래그 방지
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});