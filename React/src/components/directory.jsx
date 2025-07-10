import {React, useState, useEffect} from "react";
import Table from "../utils/datatable";
import Search from "./search";

function Directory(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/0');
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
      }, []);

    return(
        <>
            <div>
                <Search />
                <Table data={data} headers={["Employee Name", "Phone Number", "Job Role", "Work Location", "Salary"]}/>
            </div>
        </>
    );
}

export default Directory;