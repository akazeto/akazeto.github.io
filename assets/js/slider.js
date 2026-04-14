const trackEl = document.getElementById('track');
const cards = trackEl ? Array.from(trackEl.querySelectorAll('.card')) : [];
const artworks = Array.from(document.querySelectorAll('.gallery .artwork'));
const total = cards.length;
const perLoad = 10;
const loadingDots = document.getElementById('loading-dots');
let loaded = 0;

// 카드 방식 (index.html)
if (cards.length > 0) {
    cards.forEach(card => card.hidden = true);

    function loadMore() {
        if (loadingDots) loadingDots.style.display = 'block';
        setTimeout(() => {
            const end = Math.min(loaded + perLoad, total);
            for (let i = loaded; i < end; i++) {
                cards[i].hidden = false;
            }
            loaded = end;
            if (loadingDots) loadingDots.style.display = 'none';
        }, 500);
    }

    loadMore();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (loaded < total) loadMore();
        }
    });
}

// 필터 버튼 (artwork.html)
function filterCards(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    artworks.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}