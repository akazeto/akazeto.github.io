const EMAILJS_SERVICE_ID = 'service_g3gb6yq';
const EMAILJS_TEMPLATE_ID = 'template_zxx5ako';
const CLOUDINARY_CLOUD = 'ducsubrtk';
const CLOUDINARY_PRESET = 'ducsubrtk';

// 파일 목록 관리
const uploadedFiles = [];

document.getElementById('fileAddBtn').addEventListener('click', () => {
    document.getElementById('file').click();
});

document.getElementById('file').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const id = Date.now();
    uploadedFiles.push({ id, file });

    // 미리보기 추가
    const item = document.createElement('div');
    item.className = 'file-preview-item';
    item.dataset.id = id;

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    item.appendChild(img);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'file-preview-remove';
    removeBtn.type = 'button';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
        const idx = uploadedFiles.findIndex(f => f.id === id);
        if (idx !== -1) uploadedFiles.splice(idx, 1);
        item.remove();
    });
    item.appendChild(removeBtn);

    document.getElementById('filePreviewList').appendChild(item);

    // input 초기화 (같은 파일 재선택 가능하게)
    this.value = '';
});

document.getElementById('commissionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    // 기존 fileInput 코드 대신
    let imageUrls = '첨부 없음';

    if (uploadedFiles.length > 0) {
        try {
            const urls = [];
            for (const { file } of uploadedFiles) {
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
            uploadedFiles.length = 0;
            document.getElementById('filePreviewList').innerHTML = '';
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