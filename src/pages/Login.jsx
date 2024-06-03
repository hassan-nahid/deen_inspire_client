import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../auth/GoogleLogin";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";


const Login = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const [
        signInWithEmailAndPassword,
        ,
        ,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const location = useLocation()
      const from = location?.state?.from?.pathname || "/"

      const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(email,password)
      }

      useEffect(() =>{
        if(user){
            return navigate(from,{replace:true})
        }
      },[navigate,user,from])

    return (
        <div className="hero min-h-screen bg-base-200">
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
                    <GoogleLogin/>
                </div>
            </div>
        </div>
    );
};

export default Login;