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
