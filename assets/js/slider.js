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

// 1. 실제 필터링을 수행하는 함수
function applyFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    console.log("필터링 적용 중:", category); // 콘솔에서 이게 뜨는지 확인해보세요!

    const artworks = document.querySelectorAll('.gallery .artwork');

    if (artworks.length === 0) return; // 갤러리가 없는 페이지라면 무시

    artworks.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 2. 모든 드롭다운 링크에 '강제 클릭 이벤트' 부여
function setupNavLinks() {
    const links = document.querySelectorAll('.dropdown a');

    links.forEach(link => {
        link.onclick = function (e) {
            const href = this.getAttribute('href');

            // 만약 현재 페이지가 artwork.html인데 클릭한 링크도 artwork.html이면
            if (window.location.pathname.includes('artwork.html') && href.includes('artwork.html')) {
                e.preventDefault(); // 페이지 이동을 막고
                history.pushState(null, '', href); // 주소창만 바꾼 뒤
                applyFilter(); // 즉시 필터 함수 실행!
            }
            // 그 외(다른 페이지에서 올 때)는 그냥 내버려 두면 알아서 이동 후 로드됨
        };
    });
}

// 3. 실행 시점들
window.addEventListener('load', () => {
    applyFilter();
    setupNavLinks();
});

// 뒤로가기 대응
window.addEventListener('popstate', applyFilter);