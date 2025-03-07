const video = document.getElementById("video");

// Kiểm tra trình duyệt hỗ trợ camera không
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: "environment" }, // Camera sau
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    })
        .then(stream => {
            let video = document.getElementById("video");
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Không thể truy cập camera", err);
            alert("Vui lòng kiểm tra quyền camera hoặc thử lại với camera trước.");

            // Nếu không thể mở camera sau, thử mở camera trước
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" } // Chuyển sang camera trước
            })
                .then(stream => {
                    let video = document.getElementById("video");
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error("Không thể truy cập bất kỳ camera nào", err);
                    alert("Thiết bị không hỗ trợ camera hoặc bị trình duyệt chặn.");
                });
        });
} else {
    alert("Trình duyệt của bạn không hỗ trợ camera.");
}


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
