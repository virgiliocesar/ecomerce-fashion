import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router'


const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation();
    if (!user) {
        alert('Você precisa fazer login primeiro')
         return <Navigate to="/entrar" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        alert('Você não tem permissão para acessar esta página')
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children
}

export default PrivateRoute