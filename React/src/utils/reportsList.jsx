import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';


function ReportsList(props){
    const navigate = useNavigate();
    const [reports, setReports] = useState([])
    const employeeId = props.employeeId

    const handleRowClick = (employeeId) => {
        console.log(employeeId);
        navigate(`/employee`, { state: {employeeId: employeeId}});
        window.location.reload();
      }

    useEffect(()=>{
      
        const fetchReports = async () => {
            const url = `http://localhost:3000/api/collect/${employeeId}`;
            console.log(url)
            try {
              const response = await fetch(url);
              const fetchedData = await response.json();
              console.log(fetchedData)
              setReports(fetchedData);

            } catch (ex) {
              console.error("Error reading characters.", ex.message);
            }
          };
          if (employeeId){
            fetchReports();
        }

          
    }, [employeeId])

    console.log("employee id", employeeId);
    console.log(reports);
    return(
        <>
        {reports ? (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2">Direct Reports</h5>
                      <ul className="list-group">
                      {reports.flat().map(employee => (
                        <li onClick={() => handleRowClick(employee.employee_id)} key={employee.employee_id} className="list-group-item">
                            <p>{employee.employee_name}</p>
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
        </>
    );
}

export default ReportsList