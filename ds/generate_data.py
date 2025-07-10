import pandas as pd
import random

# names = [
# "Thomas Parsons"
# "Brandon Dickson"
# "Hasan Barlow"
# "Zack Rodriguez"
# "Bertha Barker"
# "Yasin Small"
# "Oisin Nelson"
# "Talia Dominguez"
# "Isobel Jefferson"
# "Riya Pratt"
# ]

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

def salary (job, loc):
    base = 80000 + 3000 * job_roles.index(job)
    loc_bonus = 5000 * locations.index(loc)
    noise = random.randint(-3000, 3000)
    return base + loc_bonus + noise

rows = []
for _ in range(1000):
    job = random.choice(job_roles)
    loc = random.choice(locations)
    rows.append({
        "job_roles": job,
        "location": loc,
        "salary": salary(job, loc)
    })

df = pd.DataFrame(rows)
df.to_csv("employee_data.csv", index=False)
print("1000 employee recors written to employee_data.csv")
    
