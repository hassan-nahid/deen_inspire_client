import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [chartData, setChartData] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
            const data = await response.json();
            if (user) {
                const userPosts = data.filter(post => post?.author === user?.displayName || post?.email === user?.email);
                setPosts(userPosts);
                // Prepare data for the chart
                const dataForChart = userPosts.reduce((acc, post) => {
                    const existingDate = acc.find(p => p.date === post.date);
                    if (existingDate) {
                        existingDate.posts += 1;
                    } else {
                        acc.push({ date: post.date, posts: 1 });
                    }
                    return acc;
                }, []);
                setChartData(dataForChart);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">User Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="card bg-white shadow-xl p-4">
                    <div className="flex items-center space-x-4">
                        <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" className="w-16 h-16 rounded-full" />
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-xl font-bold">{user?.displayName}</h2>
                            <p>{user?.email}</p>
                            <p>{user?.displayName}</p>
                            <Link to="/profile_page" className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Edit Profile</Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-white shadow-xl p-4 col-span-2">
                    <h2 className="text-xl font-bold mb-4">Post Statistics</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="posts" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <div key={post._id} className="card bg-white shadow-xl">
                        <figure><img src={post?.picture} alt={post?.title} className="w-full h-48 object-cover" /></figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg font-bold">{post?.title.split(' ').slice(0, 3).join(' ')}...</h2>
                            <p className="text-sm text-gray-500">by {post?.author} on {post?.date}</p>
                            <p className="mt-2 text-gray-700">{post?.content.split(' ').slice(0, 10).join(' ')}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
