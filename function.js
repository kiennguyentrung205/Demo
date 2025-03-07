// Bật camera
const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Không thể truy cập camera", err);
    });

// Chụp ảnh từ camera
function captureImage() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    processImage();
}

// Xử lý ảnh tải lên
document.getElementById("upload").addEventListener("change", function () {
    processImage();
});

// Giả lập xử lý AI và trả kết quả
function processImage() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<p>Đang xử lý...</p>";

    setTimeout(() => {
        const result = [
            { type: "Rác thải nhựa", note: "Nhựa có thể tái chế, rửa sạch trước khi bỏ vào thùng tái chế." },
            { type: "Rác thải giấy", note: "Giấy sạch có thể tái chế, giấy bẩn (dầu mỡ) thì không." },
            { type: "Rác thải kim loại", note: "Kim loại có thể tái chế, hãy phân loại riêng." },
            { type: "Rác thải thủy tinh", note: "Có thể tái chế, cẩn thận khi xử lý." },
            { type: "Rác thải điện tử", note: "Không bỏ chung với rác thải thường, mang đến nơi thu gom rác điện tử." },
            { type: "Rác thải vải vóc", note: "Có thể tái sử dụng hoặc quyên góp nếu còn dùng được." }
        ];
        const randomResult = result[Math.floor(Math.random() * result.length)];
        outputDiv.innerHTML = `<p>Loại rác: <strong>${randomResult.type}</strong></p><p>Lưu ý: ${randomResult.note}</p>`;
    }, 2000);
}