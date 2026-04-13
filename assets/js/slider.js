const track = document.getElementById('track');
const cards = Array.from(track.querySelectorAll('.card'));
const total = cards.length;
const perLoad = 10;
const loadingDots = document.getElementById('loading-dots');  // 위로 이동
let loaded = 0;

// 처음엔 모두 숨기기
cards.forEach(card => card.hidden = true);

// 카드 추가 로드
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

// 처음 로드
loadMore();

// 스크롤 감지
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        if (loaded < total) {
            loadMore();
        }
    }
});