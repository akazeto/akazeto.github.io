const EMAILJS_SERVICE_ID = 'service_g3gb6yq';
const EMAILJS_TEMPLATE_ID = 'template_zxx5ako';
const CLOUDINARY_CLOUD = 'ducsubrtk';
const CLOUDINARY_PRESET = 'ducsubrtk';

document.getElementById('commissionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    const fileInput = document.getElementById('file');
    let imageUrls = '첨부 없음';

    // 파일이 있으면 Cloudinary에 업로드
    if (fileInput && fileInput.files.length > 0) {
        try {
            const urls = [];
            for (const file of fileInput.files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', CLOUDINARY_PRESET);

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
                    { method: 'POST', body: formData }
                );
                const data = await res.json();

                if (data.secure_url) {
                    urls.push(data.secure_url);
                } else {
                    throw new Error('업로드 실패');
                }
            }
            imageUrls = urls.join('\n');
        } catch (err) {
            console.error('Cloudinary error:', err);
            alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
            btn.textContent = '신청서 보내기';
            btn.disabled = false;
            return;
        }
    }

    // EmailJS로 전송
    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('contact').value,
        type: document.getElementById('type').value,
        background: document.querySelector('input[name="background"]:checked')?.value || '미선택',
        desc: document.getElementById('desc').value,
        images: imageUrls,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
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