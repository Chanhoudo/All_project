const imagePath = '../runs/detect/exp2/';
let imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // 예시 이미지 파일명, 실제 파일명으로 변경
let currentIndex = 0;

// 예제 거리 데이터 (단위: 미터)
const distances = {
    person: 12,  // 예시: 사람과의 거리 12m
    car: 25      // 예시: 차와의 거리 25m
};

// 거리와 위험 상태를 업데이트하는 함수
function updateSafetyStatus() {
    const statusText = document.getElementById('status-text');
    const safetyStatus = document.querySelector('.safety-status');

    if (distances.person <= 10 || distances.car <= 20) {
        statusText.innerText = "위험";
        safetyStatus.classList.remove('safe');
        safetyStatus.classList.add('danger');
    } else {
        statusText.innerText = "안전";
        safetyStatus.classList.remove('danger');
        safetyStatus.classList.add('safe');
    }
}

// 거리 데이터를 기반으로 그래프를 생성하는 함수
function createDistanceChart() {
    const ctx = document.getElementById('distanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Person', 'Car'],
            datasets: [{
                label: 'Distance (m)',
                data: [distances.person, distances.car],
                backgroundColor: ['#3498db', '#2ecc71'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 30
                }
            }
        }
    });
}

// 이미지를 업데이트하는 함수
function updateImage() {
    const imgElement = document.getElementById('detected-image');
    imgElement.src = imagePath + imageFiles[currentIndex];
}

// 이전 이미지를 표시하는 함수
function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
}

// 다음 이미지를 표시하는 함수
function showNextImage() {
    if (currentIndex < imageFiles.length - 1) {
        currentIndex++;
        updateImage();
    }
}

// 초기화 함수
function init() {
    // 첫 번째 이미지와 그래프 초기화
    updateImage();
    createDistanceChart();
    updateSafetyStatus();

    // 버튼 이벤트 설정
    document.getElementById('prevButton').addEventListener('click', showPrevImage);
    document.getElementById('nextButton').addEventListener('click', showNextImage);
}

// 페이지 로드 시 초기화
window.onload = init;
