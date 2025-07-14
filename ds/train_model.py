import pandas as pd
from sklearn.linear_model import LinearRegression   # the ML model we're using to predict salary
from sklearn.preprocessing import OneHotEncoder     # # converts text data to numbers 
from sklearn.compose import ColumnTransformer       # applies transformations to specific columns
from sklearn.pipeline import make_pipeline          # combines steps into one pipeline
import joblib       # saves and loads the trained model
from sklearn.metrics import r2_score

# loads csv data into a DateFrame named df
df = pd.read_csv('employee_data.csv')
# X is input data to predict salary, 
X = df[["job_roles", "location"]]
# y is the output 
y = df["salary"]

# turns the text values in columns into numbers using encoder
preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(), ['job_roles', 'location'])]

)

# combines the text conversion and linear regression model into one clean pipeline
model = make_pipeline(preprocessor, LinearRegression())

# model learns patterns between X and y
model.fit(X, y)

# check accuracy of model using r^2 score
predictions = model.predict(X)
score = r2_score(y, predictions)
print("Model R^2 Score", round(score, 2))


# saves the trained model into a pkl file
joblib.dump(model, 'salary_model.pkl')

print("Trained model saved as salary_mode;.pkl")
