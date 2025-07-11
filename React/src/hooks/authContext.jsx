import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    //try to get a user if exists
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    //when new user, update local storage.
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/fetch/${user.employee_id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log("API result:", result[0]);
                    setUserData(result[0]);
                } catch (err) {
                    console.error("Fetch error:", err);
                }
            };
            fetchData();
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

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
            console.log("data from auth:", data)
            if (data != null) {
               
                setUser({
                    employee_id: data, // Storing the uid returned from the server
                    employee_name: userData.employee_name,
                    phone_number: userData.phone_number,
                    job_role: userData.job_role,
                    work_location: userData.work_location,
                    salary: userData.salary,
                    role: userData.role,
                    direct_reports: userData?.direct_reports

                });
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);