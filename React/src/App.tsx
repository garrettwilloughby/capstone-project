import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home, Login, Directory, Employee, RequireAuth} from './components'
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
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="border">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/directory">Directory</Link>
          </li>
          <li>
            {user ? (<p onClick={() => logout()}>Logout</p>) : (<Link to="/Login">Login</Link>)}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/directory" element={<RequireAuth><Directory /></RequireAuth>} />
        <Route path="/employee/:employee_id" element={<RequireAuth><Employee /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App
