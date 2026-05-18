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

    document.getElementById('file').addEventListener('change', function () {
        const label = document.getElementById('fileLabel');
        const lang = localStorage.getItem('lang') || 'ko';
        const noFile = { ko: '선택된 파일 없음', en: 'No files selected', ja: 'ファイルが選択されていません' };

        if (this.files.length > 0) {
            label.textContent = Array.from(this.files).map(f => f.name).join(', ');
        } else {
            label.textContent = noFile[lang];
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