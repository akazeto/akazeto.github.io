const track = document.getElementById('track');
const cards = track.querySelectorAll('.card');
const total = cards.length;
const perPage = 6;
const gap = 12;
const pages = Math.ceil(total / perPage);
let page = 0;

function update() {
    const start = page * perPage;
    cards.forEach((card, i) => {
        card.hidden = !(i >= start && i < start + perPage);
    });
    document.getElementById('counter').textContent = `${page + 1} / ${pages}`;
    document.getElementById('prev').disabled = page === 0;
    document.getElementById('next').disabled = page === pages - 1;
}

document.getElementById('prev').onclick = () => { if (page > 0) { page--; update(); } };
document.getElementById('next').onclick = () => { if (page < pages - 1) { page++; update(); } };

update();