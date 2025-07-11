import pandas as pd
import random


job_roles = [
    "Software Engineer",
    "Data Engineer",
    "Data Anaylst",
    "UX Designer",
    "Devops Engineer"
]

locations = [
    "London",
    "New York",
    "San Francisco",
    "Cairo",
    "Shanghai"
]

role_base_salary = {
    "Software Engineer": 100000,
    "Data Engineer": 95000,
    "Data Anaylst": 85000,
    "UX Designer": 80000,
    "Devops Engineer": 97000
}

location_bonus = {
    "London": 10000,
    "New York": 15000,
    "San Francisco": 20000,
    "Cairo": 0,
    "Shanghai": 5000
}

rows = []

for _ in range(1000):
    job = random.choice(job_roles)
    loc = random.choice(locations)

    base = role_base_salary[job]
    loc_bonus = location_bonus[loc]
    noise = random.randint(-3000, 3000)

    salary = base + loc_bonus + noise
    row = {
         "job_roles": job,
        "location": loc,
        "salary": salary
    }

    rows.append(row)

df = pd.DataFrame(rows)
df.to_csv("employee_data.csv", index=False)
print("Wrote rows", len(df))
    
