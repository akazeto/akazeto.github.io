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

// 필터링 핵심 함수
function filterArtwork() {
    // 1. URL에서 category 값 가져오기 (?category=bluearchive 등)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    console.log("현재 필터링 카테고리:", category); // 확인용

    const artworks = document.querySelectorAll('.gallery .artwork');

    artworks.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 상황 1: 페이지가 처음 로드될 때 실행
window.addEventListener('load', filterArtwork);

// 상황 2: 이미 artwork.html인 상태에서 드롭다운을 눌러 URL이 바뀔 때 실행
// 뒤로가기/앞으로가기 포함
window.addEventListener('popstate', filterArtwork);

// 상황 3: 만약 <a> 태그 클릭 시 URL만 바뀌고 페이지가 안 바뀐다면 강제로 감지
// 모든 드롭다운 링크에 이벤트를 걸어줍니다.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown a').forEach(link => {
        link.addEventListener('click', () => {
            // 클릭 후 URL이 바뀐 직후에 filterArtwork를 실행하기 위해 0.1초 지연
            setTimeout(filterArtwork, 100);
        });
    });
});