function setLang(lang) {
    document.querySelectorAll('[data-ko]').forEach(el => {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
    localStorage.setItem('lang', lang);
}

window.addEventListener('DOMContentLoaded', () => {
    setLang(localStorage.getItem('lang') || 'ko');
});