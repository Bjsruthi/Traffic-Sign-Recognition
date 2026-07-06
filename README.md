
# 🚦 Traffic Sign Recognition using CNN

A Flask-based web application that recognizes and classifies traffic signs from uploaded images using a Convolutional Neural Network (CNN) trained on the German Traffic Sign Recognition Benchmark (GTSRB) dataset.

## Final Output
<img width="1015" height="819" alt="image" src="https://github.com/user-attachments/assets/185e9d74-4af7-4ce5-b032-a9f89310912c" />
<img width="1222" height="801" alt="image" src="https://github.com/user-attachments/assets/f12089f4-a481-45fc-be31-edfb1b2ab39b" />

## Features
- Upload traffic sign images
- Predict traffic sign class using a trained CNN model
- Display prediction with confidence score
- Clean and responsive user interface
- Built with Flask and TensorFlow

## Technologies Used
- Python
- Flask
- TensorFlow / Keras
- OpenCV
- NumPy
- HTML, CSS, JavaScript

## Project Structure

```
TrafficSignRecognition/
├── clientApp.py
├── predict.py
├── Traffic.h5
├── requirements.txt
├── templates/
├── static/
└── utils/
```

## Installation

```bash
git clone https://github.com/Bjsruthi/Traffic-Sign-Recognition.git
cd TrafficSignRecognition

python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
```

## Run the Application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

## Dataset
German Traffic Sign Recognition Benchmark (GTSRB)
