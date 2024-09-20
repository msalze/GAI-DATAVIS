from flask import Flask, request, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save file if needed
    # file_path = os.path.join('/path/to/save', file.filename)
    # file.save(file_path)

    # Process the file and prepare data for visualization
    # This is a placeholder; you should add logic to process the file
    data = {'message': 'File uploaded successfully', 'filename': file.filename}

    return jsonify(data)



if __name__ == "__main__":
    app.run(port=5000)