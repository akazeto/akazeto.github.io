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

// 1. 필터링 로직 (단순 명료하게)
function filterItems(category) {
    const artworks = document.querySelectorAll('.gallery .artwork');
    console.log("필터링 실행:", category); // 콘솔 확인용

    artworks.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 2. 드롭다운 클릭 이벤트 설정
function initMenu() {
    const dropdownLinks = document.querySelectorAll('.dropdown a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const filterValue = this.getAttribute('data-filter');

            // 현재 페이지가 artwork.html인 경우에만!
            if (window.location.pathname.includes('artwork.html')) {
                // 새로고침 방지
                e.preventDefault();

                // URL 주소창만 조용히 변경 (새로고침 X)
                const newUrl = `artwork.html?category=${filterValue}`;
                history.pushState(null, '', newUrl);

                // 필터 적용
                filterItems(filterValue);
            }
            // artwork.html이 아닌 다른 페이지(index 등)라면 
            // e.preventDefault()를 안 했으므로 정상적으로 artwork.html로 이동합니다.
        });
    });
}

// 3. 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    // URL에서 카테고리 읽기
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';

    filterItems(category);
    initMenu();
});

// 4. 브라우저 뒤로가기 버튼 대응
window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    filterItems(category);
});