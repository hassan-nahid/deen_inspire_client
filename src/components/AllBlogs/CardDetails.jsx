import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLoaderData } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";

const CardDetails = () => {
    const cardData = useLoaderData();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(cardData?.comments ?? []);
    const [user] = useAuthState(auth);

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        if (newComment.trim() !== "") {
            try {
                const newCommentData = { user: user?.displayName || "Guest", comment: newComment, date: new Date().toISOString() };
                const updatedComments = [...comments, newCommentData]; // Update UI optimistically
    
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${cardData?._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        comments: updatedComments // Send all comments including the new one to the server
                    })
                });
    
                if (response.ok) {
                    setComments(updatedComments); // Update UI with the new comment
                    setNewComment("");
    
                    // Show a success toast
                    toast.success('Comment posted successfully!', {
                        duration: 4000, 
                        position: 'top-center', 
                    });
                } else {
                    console.error('Failed to add comment:', response.statusText);
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };
    
    

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img className="w-full h-64 object-cover object-center" src={cardData?.picture} alt={cardData?.title} />
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{cardData?.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">Author: {cardData?.author}</p>
                    <p className="text-sm text-gray-600">Date: {cardData?.date}</p>
                    <p className="text-sm text-gray-600">Category: {cardData?.category}</p>
                    <p className="text-sm text-gray-600">Tags: {cardData?.tags?.join(', ')}</p>
                    <p className="mt-4 text-gray-700">{cardData?.content}</p>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
                        <ul>
                            {comments?.map((comment, index) => (
                                <li key={index} className="mb-4">
                                    <p className="text-sm text-gray-600">
                                        <strong>{comment?.user}</strong> - {comment?.comment} ({new Date(comment?.date).toLocaleDateString()})
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Post a Comment</h3>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-2 btn bg-green-600 hover:bg-green-400 text-white font-semibold"
                            >
                                Post Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
