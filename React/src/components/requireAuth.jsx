import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';
const RequireAuth = ({ children }) => {
const auth = useAuth();
const location = useLocation();
if (!auth?.user) {
// Redirect them to the login page, but save the current location they were trying to go to after login
return <Navigate to="/login" state={{ from: location }} replace />;
}
return children;
};
export default RequireAuth;