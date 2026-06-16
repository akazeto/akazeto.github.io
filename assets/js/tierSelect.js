const tierOptions = {
    illustration: [
        { value: '흉상 (일러스트)',   ko: '일러스트 : 흉상 (70,000₩)',  en: 'illustration : Bust-up (₩70,000)',    ja: 'イラスト : バストアップ (70,000₩)' },
        { value: '반신 (일러스트)',  ko: '일러스트 : 반신 (90,000₩)',  en: 'illustration : Thighs-up (₩90,000)',  ja: 'イラスト : 半身 (90,000₩)' },
        { value: '전신 (일러스트)',   ko: '일러스트 : 전신 (120,000₩)', en: 'illustration : Full-body (₩120,000)', ja: 'イラスト : 全身 (120,000₩)' },
    ],
    rkgk: [
        { value: '흉상 (rkgk)',  ko: 'rkgk : 흉상 (35,000₩)', en: 'rkgk : Bust-up (₩35,000)',   ja: 'rkgk : バストアップ (35,000₩)' },
        { value: '반신 (rkgk)', ko: 'rkgk : 반신 (55,000₩)', en: 'rkgk : Thighs-up (₩55,000)', ja: 'rkgk : 半身 (55,000₩)' },
    ]
};

let currentTier = 'illustration';

function switchTier(tier) {
    currentTier = tier;

    // 탭 버튼 활성화
    document.querySelectorAll('.tier-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 티어카드 표시/숨김
    document.getElementById('tier-illustration').style.display = tier === 'illustration' ? '' : 'none';
    document.getElementById('tier-rkgk').style.display = tier === 'rkgk' ? '' : 'none';

    // 폼 select 옵션 업데이트
    updateSelectOptions(tier);
}

function updateSelectOptions(tier) {
    const lang = localStorage.getItem('lang') || 'ko';
    const select = document.getElementById('type');
    const placeholder = { ko: '선택해주세요', en: 'Please select', ja: '選択してください' };

    select.innerHTML = `<option value="">${placeholder[lang]}</option>`;
    tierOptions[tier].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt[lang];
        select.appendChild(option);
    });
}

// 페이지 로드시 초기화
window.addEventListener('DOMContentLoaded', () => {
    updateSelectOptions('illustration');
    
    document.querySelector('.tier-tab').classList.add('active');
    document.getElementById('tier-rkgk').style.display = 'none';
});