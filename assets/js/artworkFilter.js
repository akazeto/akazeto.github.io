function filterArtwork(category) {
    const items = document.querySelectorAll('.gallery .artwork');
    items.forEach(item => {
        if (category === 'all' || !category || item.dataset.category === category) {
            item.hidden = false;
        } else {
            item.hidden = true;
        }
    });
}

// 페이지가 완전히 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    filterArtwork(category);
});