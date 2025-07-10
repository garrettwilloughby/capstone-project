import React from "react";
import { useAuth } from '../hooks/AuthContext';

function Home(){
    const { user } = useAuth();
    return(
        <>
            <p>Home component</p>
            <p>{user.employee_id}</p>
        </>
    );
}

export default Home;