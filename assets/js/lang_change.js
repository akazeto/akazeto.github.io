function setLang(lang) {
    document.querySelectorAll('[data-ko]').forEach(function (el) {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    var activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
    localStorage.setItem('lang', lang);
}

window.addEventListener('DOMContentLoaded', function () {
    setLang(localStorage.getItem('lang') || 'ko');
});