import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home, Login, Directory, Employee, RequireAuth, Analysis} from './components'
import { AuthProvider, useAuth } from "./hooks/AuthContext";

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

function AppContent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="app-container vw-100 vh-100 overflow-hidden">
      <nav className="navbar border-bottom w-100 px-3">
        <ul className="d-flex list-unstyled m-0 py-2 w-100 align-items-center">
          <li className="me-4">
            {user ? <Link to="/" className="travelers-text text-decoration-none">Home</Link> : <p></p>}
          </li>
          <li className="me-4">
            {user ? <Link to="/directory" className="travelers-text text-decoration-none">Directory</Link> : <p></p>}
          </li>
          <li className="me-4">
            {user ? <Link to="/analysis" className="travelers-text text-decoration-none">Analysis</Link> : <p></p>}
          </li>
          <li className="ms-auto d-flex align-items-center">
            {user ? (
              <>
                <p className="m-0 me-3 login-button" style={{ cursor: 'pointer' }} onClick={() => logout()}>Logout</p>
               
                  <div 
                    onClick={() => navigate(`/employee`, { state: {employeeId: user.employee_id}})}
                    className="profile-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#E61616',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {user.employee_name ? user.employee_name.charAt(0).toUpperCase() : 'U'}
                  </div>
             
              </>
            ) : (
              // <Link to="/Login" className="text-decoration-none login-button">Login</Link>
              <p></p>
            )}
          </li>
        </ul>
      </nav>
      <div className="content-container w-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/directory" element={<RequireAuth><Directory /></RequireAuth>} />
          <Route path="/employee" element={<RequireAuth><Employee /></RequireAuth>} />
          <Route path="/analysis" element={<RequireAuth><Analysis /></RequireAuth>} />
        </Routes>
      </div>
    </div>
  );
}

export default App
