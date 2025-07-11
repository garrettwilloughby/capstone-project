import React, { useEffect, useState } from "react";
import {useParams, useNavigate, useLocation } from "react-router-dom"; 
import { useAuth } from '../hooks/AuthContext';

function Employee(){
    const [data, setData] = useState([])
    const { user } = useAuth();
    const location = useLocation();
    const employeeId = location.state?.employeeId;

    const handleRowClick = (row) => {
        //console.log(row.employee_id);
        navigate(`/employee/${row.employee_id}`)
      }

    
    useEffect(() => {
        const fetchData = async () => {
          const url = `http://localhost:3000/api/fetch/${employeeId}`;
    
          try {
            const response = await fetch(url);
            //console.log(response);
            const fetchedData = await response.json();
            //console.log(fetchedData);
            setData(fetchedData[0]);
          } catch (ex) {
            console.error("Error reading characters.", ex.message);
          }
        };
    
        fetchData();
        console.log(data)
      }, []);

      return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
    
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h2 className="mb-0">{data.employee_name}</h2>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="text-center mb-3">
                        {/* Placeholder avatar with initials */}
                        <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto" 
                             style={{ width: "100px", height: "100px", fontSize: "2rem" }}>
                          {data.employee_name?.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        
                        <div className="col-md-6 mb-3">
                          <h6 className="text-muted">Job Role</h6>
                          <p className="fw-bold">
                            {data.job_role}
                            {data.isHr && <span className="badge bg-info ms-2">HR Staff</span>}
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h6 className="text-muted">Work Location</h6>
                          <p className="fw-bold">{data.work_location}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h6 className="text-muted">Phone Number</h6>
                          <p className="fw-bold">{data.phone_number}</p>
                        </div>
                        {data.isHr ? (<div className="col-md-6 mb-3">
                          <h6 className="text-muted">Salary</h6>
                          <p className="fw-bold">${data.salary?.toLocaleString()}</p>
                        </div>) : (<div className="col-md-6 mb-3"><p></p></div>)}
                      </div>
                    </div>
                  </div>
    
                  {data.direct_reports && data.direct_reports.length > 0 ? (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2">Direct Reports</h5>
                      <ul className="list-group">
                        {data.direct_reports.map(report => (
                          <li key={data.direct_reports.employee_id} className="list-group-item">
                                <p>{report}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="alert alert-info mt-3">
                      <i className="bi bi-info-circle me-2"></i>
                      This employee has no direct reports.
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between">
                    {/* <Link to="/employees" className="btn btn-outline-secondary">
                      <i className="bi bi-arrow-left me-1"></i> Back to List
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }


export default Employee;