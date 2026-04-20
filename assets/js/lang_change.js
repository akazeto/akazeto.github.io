function setLang(lang) {
    document.querySelectorAll('[data-ko]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
    localStorage.setItem('lang', lang);
}

// 페이지 로드시 저장된 언어 적용
window.addEventListener('DOMContentLoaded', () => {
    setLang(localStorage.getItem('lang') || 'ko');
});