function filterArtwork(category) {
    const items = document.querySelectorAll('.gallery .artwork');
    if (items.length === 0) return;

    items.forEach(item => {
        if (category === 'all' || !category || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // 모든 버튼 active 제거
    document.querySelectorAll('.dropdown li a').forEach(btn => {
        btn.classList.remove('active');
    });

    // 해당 버튼에 active 추가
    document.querySelectorAll('.dropdown li a').forEach(btn => {
        const btnCategory = btn.getAttribute('onclick')?.match(/'(.+?)'/)?.[1];
        if (btnCategory === category || (!category && btnCategory === 'all')) {
            btn.classList.add('active');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    filterArtwork(category);
});