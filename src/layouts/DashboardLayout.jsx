import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd, MdOutlineManageSearch } from "react-icons/md";

const DashboardLayout = () => {

    const [user] = useAuthState(auth);

    const [signOut] = useSignOut(auth);

    const handleLogout = async () => {
        const success = await signOut()
        if (success) {
            alert("Logout Successful")
        }
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden  bg-green-600 hover:bg-green-400 text-white font-semibold">Open Menu</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
                    {/* Sidebar content here */}
                    <div>
                        <li><Link className="text-green-600 font-semibold" to={"/"}><FaHome />Main Home</Link></li>
                        <li><Link className="text-green-600 font-semibold" to={"/dashboard/add_post"}><MdOutlinePostAdd />Add Post</Link></li>
                        <li><Link className="text-green-600 font-semibold" to={"/dashboard/manage_post"}><MdOutlineManageSearch />Manage Post</Link></li>
                    </div>
                    <div className="flex gap-1">
                        {user && user.photoURL === null ?
                            <Link to="/profile_page" className="w-12">
                                <img title={user?.email} className="rounded-full" src={"https://i.ibb.co/kg6fMYC/placeholder.jpg"} />
                            </Link> :
                            <Link to="/profile_page" className="w-12">
                                <img title={user?.email} className="rounded-full" src={user?.photoURL} />
                            </Link>}
                        {user ? <button onClick={handleLogout} className="btn bg-green-600 w-[80%] hover:bg-green-400 text-white font-semibold">Logout</button> :
                            <Link to="/login" className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Login</Link>}
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;