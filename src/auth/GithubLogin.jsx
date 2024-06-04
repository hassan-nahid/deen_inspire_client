import { FaGithub } from "react-icons/fa";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithGithub } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

const GithubLogin = () => {
    const [signInWithGithub] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [user] = useAuthState(auth);

    const handleGithubLogin = async () => {
        try {
            await signInWithGithub();
            toast.success("Logged in with GitHub successfully!");
        } catch (error) {
            toast.error("Failed to log in with GitHub");
        }
    };

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, user]);

    return (
        <div className="text-center mb-4">
            <button onClick={handleGithubLogin} className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">
                Login With GitHub <FaGithub />
            </button>
        </div>
    );
};

export default GithubLogin;
