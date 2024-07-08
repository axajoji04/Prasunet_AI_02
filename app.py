from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analysis import get_sentiment

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data['text']
    result = get_sentiment(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
