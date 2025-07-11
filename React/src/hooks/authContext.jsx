import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(() => {
        //this correctly loads the user from localStorage on initial load
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    //fetch user data whenever user.employee_id changes
    useEffect(() => {
        if (user && user.employee_id) {
            const fetchData = async () => {
                try {
                    console.log("Fetching data for user ID:", user.employee_id);
                    const response = await fetch(`http://localhost:3000/api/fetch/${user.employee_id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log("API result:", result[0]);
                    
                    //update user with complete data from API
                    const completeUserData = result[0];
                    setUserData(completeUserData);
                    
                    //update the user state with complete data
                    setUser(currentUser => ({
                        ...currentUser,
                        employee_name: completeUserData.employee_name,
                        phone_number: completeUserData.phone_number,
                        job_role: completeUserData.job_role,
                        work_location: completeUserData.work_location,
                        salary: completeUserData.salary,
                        role: completeUserData.role,
                        direct_reports: completeUserData.direct_reports
                    }));
                    
                    //update localStorage with user data
                    localStorage.setItem('user', JSON.stringify({
                        employee_id: user.employee_id
                    }));
                    
                } catch (err) {
                    console.error("Fetch error:", err);
                }
            };
            fetchData();
        } else {
            localStorage.removeItem('user');
        }
    }, [user?.employee_id]);

    const login = async (username, password) => {
        try {
            const response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log("Login response data:", data);
            
            if (data != null) {
                setUser({
                    employee_id: data
                });
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
