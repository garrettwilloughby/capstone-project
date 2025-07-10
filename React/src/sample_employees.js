const fakeEmployees = [
    {
      "employee_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "employee_name": "John Smith",
      "phone_number": "555-123-4567",
      "job_role": "Software Engineer",
      "work_location": "New York",
      "salary": 85000,
      "isHr": false,
      "direct_reports": []
    },
    {
      "employee_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
      "employee_name": "Maria Johnson",
      "phone_number": "555-234-5678",
      "job_role": "Engineering Manager",
      "work_location": "San Francisco",
      "salary": 120000,
      "isHr": false,
      "direct_reports": [
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "c3d4e5f6-a7b8-9012-cdef-345678901234"
      ]
    },
    {
      "employee_id": "c3d4e5f6-a7b8-9012-cdef-345678901234",
      "employee_name": "Robert Williams",
      "phone_number": "555-345-6789",
      "job_role": "Senior Developer",
      "work_location": "New York",
      "salary": 95000,
      "isHr": false,
      "direct_reports": []
    },
    {
      "employee_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
      "employee_name": "Ana Garcia",
      "phone_number": "555-456-7890",
      "job_role": "HR Director",
      "work_location": "Chicago",
      "salary": 110000,
      "isHr": true,
      "direct_reports": [
        "e5f6a7b8-c9d0-1234-efgh-567890123456"
      ]
    },
    {
      "employee_id": "e5f6a7b8-c9d0-1234-efgh-567890123456",
      "employee_name": "Li Chan",
      "phone_number": "555-567-8901",
      "job_role": "HR Specialist",
      "work_location": "Chicago",
      "salary": 75000,
      "isHr": true,
      "direct_reports": []
    }
  ]
  
export default fakeEmployees