import os
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from model.mock_model import predict, get_all_diseases

app = Flask(__name__)
CORS(app)

app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "dcm"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Chest X-Ray API is running"})


@app.route("/api/predict", methods=["POST"])
def predict_endpoint():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Please upload a PNG or JPG image."}), 400

    try:
        image_bytes = file.read()
        Image.open(BytesIO(image_bytes)).verify()
        result = predict(image_bytes)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500


@app.route("/api/diseases", methods=["GET"])
def diseases_endpoint():
    return jsonify(get_all_diseases())


@app.route("/api/contact", methods=["POST"])
def contact_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    required = ["name", "email", "message"]
    for field in required:
        if field not in data or not data[field].strip():
            return jsonify({"error": f"'{field}' is required"}), 400
    return jsonify({"message": "Thank you for your message. We will get back to you soon."})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=port, debug=True)
