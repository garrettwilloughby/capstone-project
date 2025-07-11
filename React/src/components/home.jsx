import React, {useState, useEffect } from "react";
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from "react-router-dom";

function Home() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     //only fetch if user exists
    //     if (user && user.employee_id) {
    //         const fetchData = async () => {
    //             try {
    //                 const response = await fetch(`http://localhost:3000/api/fetch/${user.employee_id}`);
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }
    //                 const result = await response.json();
    //                 console.log("API result:", result[0]);
    //                 setData(result[0]);
    //             } catch (err) {
    //                 console.error("Fetch error:", err);
    //                 setError(err);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [user]); //user as a dependency
    useEffect(() => {
        if (user && user.employee_id){
            console.log(user)
        }else{
            return <p>User not authenticated</p>;
        }
    },[user])

    // Define container style for fixed width
    const containerStyle = {
        maxWidth: '1000px',
        minWidth: '800px',
        margin: '0 auto'
    };
   

    return (
        <>
        <div style={containerStyle}>
            <h1 className="mb-20">Welcome, {user.employee_name}</h1>

            <div className="row mt-4">
                <div onClick={() => navigate("/directory")} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
                            <h3 className="card-title">Directory</h3>
                        </div>
                    </div>
                </div>
                
                <div onClick={() => navigate(`/employee`, { state: {employeeId: user.employee_id}})} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
                            <h3 className="card-title">Profile</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;
