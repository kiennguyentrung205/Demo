const video = document.getElementById("video");

// Kiểm tra trình duyệt có hỗ trợ camera không
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: "environment" }, // Sử dụng camera sau
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.warn("Không thể mở camera sau, thử mở camera trước...", err);

            // Nếu không mở được camera sau, thử camera trước
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" }
            })
                .then(stream => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error("Không thể mở camera nào cả", err);
                    alert("Thiết bị không hỗ trợ camera hoặc quyền bị từ chối.");
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

function processImage() {
    const canvas = document.getElementById("canvas");
    
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append("file", blob, "capture.jpg");
        
        fetch("http://localhost:8080/predict", { // Đảm bảo địa chỉ và port khớp
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = `<p>Loại rác: <strong>${data.type}</strong></p>
                                   <p>Lưu ý: ${data.note}</p>`;
        })
        .catch(error => {
            console.error("Lỗi kết nối với server:", error);
            document.getElementById("output").innerHTML = "<p>Có lỗi xảy ra khi xử lý ảnh.</p>";
        });
    }, "image/jpeg");
}

