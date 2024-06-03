import { FaGoogle } from "react-icons/fa";
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/"
    const [user] = useAuthState(auth);


    const handleGoogleLogin = () => {
        signInWithGoogle()
    }

    useEffect(()=>{
       if(user){
        navigate(from,{replace:true})
       }
    },[from,navigate,user])

    return (
        <div className="text-center mb-4">
            <div className="divider w-[80%] mx-auto">OR</div>
            <button onClick={handleGoogleLogin} className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Login With Google<FaGoogle /></button>
        </div>
    );
};

export default GoogleLogin;