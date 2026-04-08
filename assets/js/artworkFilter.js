function filterArtwork(category) {
    const items = document.querySelectorAll('.gallery .artwork');
    items.forEach(item => {
        if (category === 'all' || !category || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    filterArtwork(category);
});