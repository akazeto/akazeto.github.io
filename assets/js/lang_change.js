function setLang(lang) {
    document.querySelectorAll('[data-ko]').forEach(function (el) {
        if (el.dataset[lang]) {
            el.innerHTML = el.dataset[lang];
        }
    });

    document.querySelectorAll('[data-placeholder-ko]').forEach(function (el) {
        const key = 'placeholder' + lang.charAt(0).toUpperCase() + lang.slice(1);
        if (el.dataset[key]) {
            el.placeholder = el.dataset[key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    var activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
    localStorage.setItem('lang', lang);

    updateSelectOptions(currentTier);
}

window.addEventListener('DOMContentLoaded', function () {
    setLang(localStorage.getItem('lang') || 'ko');
});