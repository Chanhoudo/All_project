from flask import Flask, render_template, jsonify, send_from_directory
import os
import base64

app = Flask(__name__)

# 이미지 파일이 저장된 디렉토리 경로
IMAGE_DIR = '/home/aisw/Downloads/trash/yolov7-main/runs/detect/exp2'
image_files = sorted(
    [f for f in os.listdir(IMAGE_DIR) if f.endswith('.jpg') or f.endswith('.png')],
    key=lambda x: int(''.join(filter(str.isdigit, x)))
)
# 예제 거리 데이터 (단위: 미터)
distances = [
    {"person": -1, "car": 20},
    {"person": -1, "car": 18},
    {"person": -1, "car": 17},
    # 추가 데이터
    {"person": -1, "car": 2},
    {"person": -1, "car": 1},
    {"person": 11, "car": 11},
    {"person": 18, "car": 11},
    {"person": 20, "car": 11},
    {"person": 18, "car": 11},
    {"person": 2, "car": -1},
    {"person": 2, "car": -1}
]


@app.route('/')
def index():
    return render_template('index.html', max_index=len(image_files))


@app.route('/image/<int:index>')
def get_image(index):
    if 0 <= index < len(image_files):
        image_path = os.path.join(IMAGE_DIR, image_files[index])
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return jsonify({"image": encoded_string, "distances": distances[index]})
    else:
        return jsonify({"error": "Invalid index"}), 404

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
