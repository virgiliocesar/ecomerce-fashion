import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router'


const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation();
    if (!user) {
        alert('You need to login first')
         return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        alert('You do not have permission to access this page')
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children
}

export default PrivateRoute