import pandas as pd
import random

# define job roles 
job_roles = [
    "Software Engineer",
    "Data Engineer",
    "Data Anaylst",
    "UX Designer",
    "Devops Engineer"
]

# define potential locations
locations = [
    "London",
    "New York",
    "San Francisco",
    "Cairo",
    "Shanghai"
]

# base salary for each job roles
role_base_salary = {
    "Software Engineer": 100000,
    "Data Engineer": 95000,
    "Data Anaylst": 85000,
    "UX Designer": 80000,
    "Devops Engineer": 97000
}

# salary bonus based on locations 
location_bonus = {
    "London": 10000,
    "New York": 15000,
    "San Francisco": 20000,
    "Cairo": 0,
    "Shanghai": 5000
}

# empty list to hold generated data
rows = []

# loop to generate 1000 randomized rows of data
for _ in range(1000):
    job = random.choice(job_roles)
    loc = random.choice(locations)

# get the base salary for job title from the dictionary
    base = role_base_salary[job]
# get the location based bonus based off where the person works
    loc_bonus = location_bonus[loc]
# adds randomness between -2000 to 2000 to make the salary look semi-realistic
    noise = random.randint(-2000, 2000)

# equation for final salary
    salary = base + loc_bonus + noise

#key-value pairs
    row = {
         "job_roles": job,
        "location": loc,
        "salary": salary
    }

    rows.append(row)
# puts the data inyo a pandas df
df = pd.DataFrame(rows)
# saves df into a csv
df.to_csv("employee_data.csv", index=False)
print("Wrote rows", len(df))
    
