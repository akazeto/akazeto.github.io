document.getElementById('commissionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    // 파일을 base64로 변환
    const fileInput = document.getElementById('file');
    let attachmentData = null;

    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        attachmentData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('contact').value,
        type: document.getElementById('type').value,
        desc: document.getElementById('desc').value,
        attachment: attachmentData || '첨부 없음'
    };

    emailjs.send(
        'service_hd4zpzj',    // EmailJS Service ID
        'template_bfe6c38',   // EmailJS Template ID
        params
    )
        .then(() => {
            document.getElementById('successMessage').style.display = 'block';
            this.reset();
            btn.textContent = '신청서 보내기';
            btn.disabled = false;
        })
        .catch((err) => {
            console.error('EmailJS error:', err);
            alert('전송 실패. 다시 시도해주세요.');
            btn.textContent = '신청서 보내기';
            btn.disabled = false;
        });
});