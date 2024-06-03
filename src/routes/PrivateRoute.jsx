import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const location = useLocation()
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <Loading/>
    }

    if(!user){
        return <Navigate to={"/login"} state={{from : location}} replace/>
    }
    return children
};

export default PrivateRoute;