from flask import Flask, request, jsonify       # Flask for creating the API
import joblib                                   # to load the saved ML model
import pandas as pd                             # to handle input data in DateFrame

model = joblib.load('salary_model.pkl')         # to load trained model
app = Flask(__name__)                           # create the Flask app

# define a POST endpoint at /predict
@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json()       # get json input from request


    try:
        # get job role and location from the input
        job_roles = data['job_roles']
        location = data['location']
        # make into a dateFrame for model to understand
        input_df = pd.DataFrame([{
            'job_roles': job_roles,
            'location': location
        }])

        # make predictions using model
        prediction = model.predict(input_df)[0]

        # return the predictions as JSON
        return jsonify({
        'predicted_salary': round(prediction, 2)
        })

    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 400
    
    # runs app locally
if __name__ == '__main__':
    app.run(debug=True)
