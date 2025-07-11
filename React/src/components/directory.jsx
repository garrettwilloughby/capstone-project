import {React, useState, useEffect} from "react";
import Table from "../utils/datatable";
import Search from "./search";
import { useAuth } from '../hooks/AuthContext';

function Directory(){
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {

        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/${user.employee_id}`);
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setSearchResults(result);
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
                {/* pass state up with useState */}
                <Search onSearchResults={setSearchResults} />
                <Table data={searchResults} headers={["Employee Name", "Phone Number", "Job Role", "Work Location", "Salary"]}/>
            </div>
        </>
    );
}

export default Directory;