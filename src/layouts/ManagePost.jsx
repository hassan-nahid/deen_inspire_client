import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";

const ManagePost = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const data = await response.json();
                if (user) {
                    const userPosts = data.filter(post => post.author === user.displayName || post.authorEmail === user.email);
                    setPosts(userPosts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [user]);

    if (!user) {
        return <p className="text-center text-red-500">Please log in to see your posts.</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Your Posts</h2>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img className="w-full h-48 object-cover object-center" src={post.picture} alt={post.title} />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">Author: {post.author}</p>
                                <p className="text-sm text-gray-600">Date: {new Date(post.date).toLocaleDateString()}</p>
                                <p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">You have no posts yet.</p>
            )}
        </div>
    );
};

export default ManagePost;
