const form = document.getElementById("commissionForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // 기본 이동 막기

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert("신청이 완료되었습니다!"); // 👉 팝업
            successMessage.style.display = "block"; // 👉 페이지 메시지
            form.reset(); // 입력 초기화
        } else {
            alert("전송 실패. 다시 시도해주세요.");
        }
    } catch (error) {
        alert("오류가 발생했습니다. 인터넷 상태를 확인해주세요.");
    }
});