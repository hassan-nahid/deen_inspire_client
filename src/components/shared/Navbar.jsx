import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const handleLogout = async () => {
        const success = await signOut()
        if (success) {
            toast.success("Logout Successful");
        }
    }


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/" className="text-green-600 font-semibold">Home</Link></li>
                        <li><Link to="/all_blog" className="text-green-600 font-semibold">All Blogs</Link></li>
                        <li><Link to="/about" className="text-green-600 font-semibold">About</Link></li>
                        <li><Link to="/contact" className="text-green-600 font-semibold">Contact</Link></li>
                        {user && <li><Link to="/dashboard" className="text-green-600 font-semibold">Dashboard</Link></li>}

                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl text-green-600">Deen Inspire</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="text-green-600 font-semibold">Home</Link></li>
                    <li><Link to="/all_blog" className="text-green-600 font-semibold">All Blog</Link></li>
                    <li><Link to="/about" className="text-green-600 font-semibold">About</Link></li>
                    <li><Link to="/contact" className="text-green-600 font-semibold">Contact</Link></li>
                    {user && <li><Link to="/dashboard" className="text-green-600 font-semibold">Dashboard</Link></li>}
                </ul>
            </div>
            <div className="navbar-end flex gap-2">
                {user && user.photoURL === null ?
                    <Link to="/profile_page" className="w-12">
                        <img title={user?.email} className="rounded-full" src={"https://i.ibb.co/kg6fMYC/placeholder.jpg"} />
                    </Link> :
                    <Link to="/profile_page" className="w-12">
                        <img title={user?.email} className="rounded-full" src={user?.photoURL} />
                    </Link>}
                {user ? <button onClick={handleLogout} className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Logout</button> :
                    <Link to="/login" className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Login</Link>}
            </div>
        </div>
    );
};

export default Navbar;