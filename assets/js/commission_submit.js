document.getElementById('commissionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    const formData = new FormData(this);

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (data.success) {
            document.getElementById('successMessage').style.display = 'block';
            this.reset();
            btn.textContent = '신청서 보내기';
            btn.disabled = false;
        } else {
            alert('전송 실패. 다시 시도해주세요.');
            btn.textContent = '신청서 보내기';
            btn.disabled = false;
        }
    } catch (err) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        btn.textContent = '신청서 보내기';
        btn.disabled = false;
    }
});