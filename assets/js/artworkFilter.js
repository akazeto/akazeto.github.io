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

// 페이지 로드 시 URL 파라미터 확인
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
filterArtwork(category);