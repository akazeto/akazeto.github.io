const track = document.getElementById('track');
const cards = track.querySelectorAll('.card');
const perPage = 5;   // 한 번에 보여줄 개수
const gap = 12;
const total = cards.length;
const pages = Math.ceil(total / perPage);
let page = 0;

function update() {
    const cardW = (track.parentElement.offsetWidth - gap * (perPage - 1)) / perPage;
    const offset = page * (cardW * perPage + gap * perPage);
    track.style.transform = `translateX(-${offset}px)`;
    document.getElementById('counter').textContent = `${page + 1} / ${pages}`;
    document.getElementById('prev').disabled = page === 0;
    document.getElementById('next').disabled = page === pages - 1;
}

document.getElementById('prev').onclick = () => { if (page > 0) { page--; update(); } };
document.getElementById('next').onclick = () => { if (page < pages - 1) { page++; update(); } };

update();