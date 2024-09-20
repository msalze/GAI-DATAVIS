from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from openai import OpenAI
client = OpenAI()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# OpenAI API Key

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Load the file into a pandas DataFrame (for CSV/Excel)
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Convert the DataFrame to a simple text format
    file_content = df.head(10).to_string()  # Show only first 10 rows for prompt
    prompt = f"Here is some demographic data in tabular form:\n\n{file_content}\n\nSummarize the key insights from this data."

    try:
        # Call OpenAI API to process the data
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # You can also use "gpt-4" if you have access
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,  # Adjust the number of tokens as needed
            temperature=0.7,  # Control randomness: 0 (deterministic) to 1 (more random)
        )

        summary = response.choices[0].message.content

        # Return the summary and some tabular data as JSON
        return jsonify({
            "summary": summary,
            #"table": df.head(10).to_dict(orient='records')
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)