import React, { useEffect, useState } from "react";
import {useParams, useNavigate, useLocation } from "react-router-dom"; 
import { useAuth } from '../hooks/AuthContext';
import ReportsList from "../utils/reportsList";

function Employee(){
    const [data, setData] = useState([])
    const { user } = useAuth();
    const location = useLocation();
    const employeeId = location.state?.employeeId;

    const isManager = () => {
        console.log("Is manager?", user);
        console.log("Is manager?", data);
        
        if (!user || !user.direct_reports || !data.employee_id) {
            return false;
        }
        
        if (!Array.isArray(user.direct_reports)) {
            return false;
        }

        const employeeIdToCheck = Number(data.employee_id);
        
        if (typeof user.direct_reports[0] === 'number') {
            return user.direct_reports.includes(employeeIdToCheck);
        }
        
        if (typeof user.direct_reports[0] === 'object') {
            return user.direct_reports.some(report => Number(report.employee_id) === employeeIdToCheck);
        }
        
        if (typeof user.direct_reports[0] === 'string') {
            return user.direct_reports.some(id => Number(id) === employeeIdToCheck);
        }
        console.log("Unrecognized format for direct_reports");
        return false;
    };
    
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
      }, [employeeId]);

      // Define container style for fixed width
      const containerStyle = {
        maxWidth: '1000px',
        minWidth: '800px',
        margin: '0 auto'
      };

      return (
        <div className="mt-4" style={containerStyle}>
          <div className="row">
            <div className="col">
              <div className="card shadow-sm">
                <div className="card-header travelers text-white">
                  <h2 className="mb-0">{data.employee_name}</h2>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="text-center mb-3">
                        {/*placeholder avatar with initials */}
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
                            {(data.role == 1) ? (<span className="badge travelers ms-2">Manager</span>) : (data.role == 2) ? (<span className="badge travelers ms-2">HR Staff</span>) : <p></p>}
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
                        {/* only show up if LOGGED in user is hr (2) or is manager for employee (1) */}
                        {(user.role === 2 || isManager() || user.employee_id == data.employee_id) ? (
                            <div className="col-md-6 mb-3">
                                <h6 className="text-muted">Salary</h6>
                                <p className="fw-bold">${data.salary?.toLocaleString()}</p>
                            </div>
                            ) : (<div className="col-md-6 mb-3"><p></p></div>)}
                      </div>
                    </div>
                  </div>
    
                  {/* reports */}
                  <ReportsList employeeId={data.employee_id}/>

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
