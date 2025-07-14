import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../hooks/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
  
    await login(username, password);
    console.log(username, password);
    navigate('/')
 

    // await fetch('http://localhost:3000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password
    //     })
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => console.log('Success:', data))
    //   //maybe make red if bad login.
    //   .catch(error => console.error('Error:', error));

    //   console.log('Login attempt with:', { username, password });
    setIsLoading(false);
    setError('Incorrect username or password.');
    setUsername('');
    setPassword('');
      
  };
  return (
    <>
     <h1 className='mb-5 fw-bold'>Enterprise Directory</h1>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-2">Welcome Back</h3>
          <p className="text-center text-muted mb-4">Please enter your credentials</p>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary travelers-btn fw-bold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
