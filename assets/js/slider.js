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

// artworks 필터 함수
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

// URL에서 category 가져오기
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
}

// 드롭다운 클릭 이벤트 등록
function setupDropdownFiltering() {
    document.querySelectorAll('.dropdown a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 링크 기본 이동 막기

            // 클릭한 링크의 category 가져오기
            const urlParams = new URL(this.href).searchParams;
            const category = urlParams.get('category') || 'all';

            // 필터 적용
            filterArtwork(category);

            // URL만 바꾸기 (브라우저 히스토리)
            history.pushState(null, '', this.href);
        });
    });
}

// 페이지 로드 시 초기 필터 적용
window.addEventListener('load', () => {
    const category = getCategoryFromURL();
    filterArtwork(category);
    setupDropdownFiltering();
});

// 뒤로가기 / 앞으로가기 버튼 클릭 시도 필터 유지
window.addEventListener('popstate', () => {
    const category = getCategoryFromURL();
    filterArtwork(category);
});