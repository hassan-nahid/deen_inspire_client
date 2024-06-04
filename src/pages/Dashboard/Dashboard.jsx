import  { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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
                const dataForChart = userPosts.map(post => ({
                    date: post.date,
                    posts: userPosts.filter(p => p.date === post.date).length,
                }));
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
                        <div>
                            <h2 className="text-xl font-bold">{user?.displayName}</h2>
                            <p>{user?.email}</p>
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
                        <figure><img src={post.picture} alt={post.title} className="w-full h-48 object-cover" /></figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg font-bold">{post.title}</h2>
                            <p className="text-sm text-gray-500">by {post.author} on {post.date}</p>
                            <p className="mt-2 text-gray-700">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
