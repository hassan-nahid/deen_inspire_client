import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ManagePostRow from "./ManagePostRow";
import auth from "../../firebase/firebase.config";
import Swal from 'sweetalert2';

const ManagePost = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
                const data = await response.json();
                if (user) {
                    const userPosts = data.filter(post => post?.author === user?.displayName || post?.authorEmail === user?.email);
                    setPosts(userPosts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [user]);

    const handleDelete = async (postId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setPosts(posts.filter(post => post?._id !== postId));
                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Failed!',
                        'Failed to delete the post.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the post.',
                    'error'
                );
            }
        }
    };

    if (!user) {
        return <p className="text-center text-red-500">Please log in to see your posts.</p>;
    }

    return (
        <div className="w-full h-full mx-auto p-6">
            <h2 className="text-2xl font-semibold text-center text-green-600 my-4">Manage Your Posts</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>Title</th>
                            <th>Category & Tags</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <ManagePostRow
                                    index={index}
                                    key={post?._id}
                                    post={post}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-600">You have no posts yet.</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Index</th>
                            <th>Title</th>
                            <th>Category & Tags</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ManagePost;
