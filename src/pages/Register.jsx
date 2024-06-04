import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../auth/GoogleLogin";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import GithubLogin from "../auth/GithubLogin";
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Register = () => {
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        ,
        ,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [passMatch, setPassMatch] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;

        if (password === confirm_password) {
            createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    if (userCredential) {
                        MySwal.fire({
                            title: 'Registration Successful!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        } else {
            setPassMatch(true);
            return;
        }
        setPassMatch(false);
    };

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, user]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-green-600">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="confirm_password" placeholder="confirm password" className="input input-bordered" required />
                        </div>
                        {passMatch && <div><p className="text-red-500">Password does not match</p></div>}
                        <label className="label">
                            <p>Already have an account?<Link to="/Login" className="link text-green-600">Login Now</Link></p>
                        </label>
                        {error && <div><p className="text-red-500">{error?.message}</p></div>}
                        <div className="form-control mt-6">
                            <button className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Register</button>
                        </div>
                    </form>
                    <GoogleLogin />
                    <GithubLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
