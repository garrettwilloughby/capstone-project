import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("employee_data.csv")

sns.set(style = 'whitegrid')

plt.figure(figsize = (8, 5))
sns.barplot(x='job_roles', y = 'salary', data= df, estimator = 'mean')
plt.title("Average Salary by Job Role")
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("ave_salary_by_role.png")
plt.show()

plt.figure(figsize = (8, 5))
sns.barplot(x='location', y = 'salary', data= df, estimator = 'mean')
plt.title("Average Salary by Location")
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("ave_salary_by_location.png")
plt.show()
