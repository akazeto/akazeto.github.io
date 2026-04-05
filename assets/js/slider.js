const perPage = 8;   /* 4¿­ ¡¿ 2Çà */
const gap = 12;
const pages = Math.ceil(total / perPage);
let page = 0;

function update() {
    const start = page * perPage;
    cards.forEach((card, i) => {
        card.style.display = (i >= start && i < start + perPage) ? 'block' : 'none';
    });
    document.getElementById('counter').textContent = `${page + 1} / ${pages}`;
    document.getElementById('prev').disabled = page === 0;
    document.getElementById('next').disabled = page === pages - 1;
}