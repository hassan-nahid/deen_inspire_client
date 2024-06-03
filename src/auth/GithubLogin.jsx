import { FaGithub } from "react-icons/fa";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithGithub } from "react-firebase-hooks/auth";

const GithubLogin = () => {
    const [signInWithGithub] = useSignInWithGithub(auth);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/"
    const [user] = useAuthState(auth);


    const handleGithubLogin = () => {
        signInWithGithub()
    }

    useEffect(()=>{
       if(user){
        navigate(from,{replace:true})
       }
    },[from,navigate,user])

    return (
        <div className="text-center mb-4">
            <button onClick={handleGithubLogin} className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Login With Github<FaGithub /></button>
        </div>
    );
};

export default GithubLogin;