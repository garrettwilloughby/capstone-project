import {React, useState, useEffect} from "react";
import Table from "../utils/datatable";

//delete later
import fakeEmployees from "../sample_employees";

function Directory(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        
        const fetchData = async () => {
            setData(fakeEmployees);
        //   try {
        //     const response = await fetch('/api/data');
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const result = await response.json();
        //     setData(result);
        //   } catch (err) {
        //     setError(err);
        //   } finally {
        //     setLoading(false);
        //   }
        };
        fetchData();
      }, []);

    return(
        <>
            <Table data={data} headers={["Employee Name", "Phone Number", "Job Role", "Work Location", "Salary"]}/>
        </>
    );
}

export default Directory;