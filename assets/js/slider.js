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

document.addEventListener("DOMContentLoaded", function () {
    // 1. URL에서 파라미터 추출 (예: artwork.html?category=bluearchive -> bluearchive)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all'; // 없으면 기본값 'all'

    // 2. 필터링 함수 실행
    filterArtwork(category);
});

function filterArtwork(category) {
    // 갤러리 아이템들을 모두 가져옴 (부모 .gallery 안의 .artwork 들)
    const artworks = document.querySelectorAll('.gallery .artwork');

    artworks.forEach(item => {
        // 'all'이거나 데이터 카테고리가 일치하면 보여주고, 아니면 숨김
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}