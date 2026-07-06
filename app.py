from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from utils.utils import decodeImage
from predict import traffic
import os

os.putenv("LANG", "en_US.UTF-8")
os.putenv("LC_ALL", "en_US.UTF-8")

app = Flask(__name__)
CORS(app)


class ClientApp:

    def __init__(self):
        self.filename = "inputImage.jpg"
        self.classifier = traffic(self.filename)


clApp = ClientApp()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predictRoute():

    image = request.json["image"]

    decodeImage(image, clApp.filename)

    result = clApp.classifier.trafficsign()

    return jsonify(result)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)