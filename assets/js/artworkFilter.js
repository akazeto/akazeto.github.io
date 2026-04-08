function applyFilter(category) {
    console.log("필터링 적용 시작:", category);
    const artworks = document.querySelectorAll('.gallery .artwork');

    artworks.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 드롭다운 클릭 시 강제 실행 함수
function forceFilter(e, category) {
    // 현재 주소가 artwork.html을 포함하고 있다면 페이지 이동을 막음
    if (window.location.pathname.includes('artwork.html') || window.location.pathname.includes('others.html')) {
        e.preventDefault(); // 새로고침 방지
        if (window.location.pathname.includes('artwork.html'))
            history.pushState(null, '', `artwork.html?category=${category}`); // 주소창 변경
        if (window.location.pathname.includes('others.html'))
            history.pushState(null, '', `others.html?category=${category}`); // 주소창 변경
        applyFilter(category); // 필터 적용
    }
}

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    applyFilter(category);
});

// 4. 뒤로가기 버튼 대응
window.onpopstate = function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    applyFilter(category);
};