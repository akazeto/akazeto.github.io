const track = document.getElementById('track');
const cards = Array.from(track.querySelectorAll('.card'));
const total = cards.length;
const perLoad = 8;  // 한 번에 보여줄 개수
let loaded = 0;

// 처음엔 모두 숨기기
cards.forEach(card => card.hidden = true);

// 카드 추가 로드
function loadMore() {
    const end = Math.min(loaded + perLoad, total);
    for (let i = loaded; i < end; i++) {
        cards[i].hidden = false;
    }
    loaded = end;
}

// 처음 로드
loadMore();

// 스크롤 감지
window.addEventListener('scroll', () => {
    // 페이지 맨 아래에 가까워지면 로드
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        if (loaded < total) {
            loadMore();
        }
    }
});

function filterArtwork(category) {
    const artworks = document.querySelectorAll('.gallery.artwork');

    artworks.forEach(artwork => {
        if (category === 'all' || artwork.dataset.category === category) {
            artwork.style.display = 'flex';
        } else {
            artwork.style.display = 'none';
        }
    });
}

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
}

document.addEventListener('DOMContentLoaded', () => {
    const category = getCategoryFromURL();
    filterArtwork(category);
});