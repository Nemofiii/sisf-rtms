from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the model from the pickle file
with open('optimized_crop_recommendation_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Parse input JSON data
        data = request.json
        temperature = data.get('temperature')
        moisture = data.get('moisture')

        # Ensure both inputs are provided
        if temperature is None or moisture is None:
            return jsonify({'error': 'Temperature and moisture are required'}), 400

        # Prepare data for the model
        input_data = [[temperature, moisture]]

        # Get prediction from the model
        prediction = model.predict(input_data)
        recommended_plant = prediction[0]

        # Return the recommendation
        return jsonify({'recommended_plant': recommended_plant}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while processing your request'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
