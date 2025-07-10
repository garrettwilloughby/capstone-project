import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home, Login, Directory, Employee } from './components'



function App() {

  return (
    <>
      <Router>
            <nav className="border">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/directory">Directory</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/employee/:employee_id" element={<Employee />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
