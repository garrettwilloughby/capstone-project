import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
import joblib

df = pd.read_csv('employee_data.csv')
X = df[["job_roles", "location"]]
y = df["salary"]

preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(), ['job_roles', 'location'])]

)

model = make_pipeline(preprocessor, LinearRegression())

model.fit(X, y)

joblib.dump(model, 'salary_model.pkl')

print("Trained model saved as salary_mode;.pkl")
