from flask import Flask, request, jsonify
import joblib
import pandas as pd

model = joblib.load('salary_model.pkl')
app = Flask(__name__)

@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json()

    try:
        job_role = data['job_roles']
        location = data['location']

        input_df = pd.DataFrame([{
            'job_roles': job_role,
            'location': location
        }])

        prediction = model.predict(input_df)[0]

        return jsonify({
        'predicted_salary': round(prediction, 2)
        })

    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 400
if __name__ == '__main__':
    app.run(debug=True)
