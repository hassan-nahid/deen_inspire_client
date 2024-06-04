import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import GoogleLogin from "../auth/GoogleLogin";
import GithubLogin from "../auth/GithubLogin";
import auth from "../firebase/firebase.config";

const MySwal = withReactContent(Swal);

const Login = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(email, password).then((userCredential) => {
            if (userCredential) {
                toast.success('Login successful!');
            }
        })
    };

    useEffect(() => {
        if (user) {
            MySwal.fire({
                title: 'Login Successful!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate(from, { replace: true });
            });
        }
    }, [user, navigate, from]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-green-600">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <label className="label">
                           <p>Don&apos;t have account?<Link to="/register" className="link text-green-600">Register Now</Link></p>
                        </label>
                        {error && <div><p className="text-red-500">{error?.message}</p></div>}
                        <div className="form-control mt-6">
                            <button className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Login</button>
                        </div>
                    </form>
                    <GoogleLogin />
                    <GithubLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
