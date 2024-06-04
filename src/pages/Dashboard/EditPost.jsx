import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";

const EditPost = () => {
    const postData = useLoaderData();
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState(postData?.title || "");
    const [author, setAuthor] = useState(postData?.author || user?.displayName || "");
    const [content, setContent] = useState(postData?.content || "");
    const [date, setDate] = useState(postData?.date || "");
    const [tags, setTags] = useState(postData?.tags?.join(", ") || "");
    const [category, setCategory] = useState(postData?.category || "");
    const [picture, setPicture] = useState(postData?.picture || "");
    const token = localStorage.getItem("token");

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            ...(title !== postData?.title && { title }),
            ...(author !== postData?.author && { author }),
            ...(content !== postData?.content && { content }),
            ...(date !== postData?.date && { date }),
            ...(tags !== postData?.tags?.join(", ") && { tags: tags.split(",").map(tag => tag.trim()) }),
            ...(category !== postData?.category && { category }),
            ...(picture !== postData?.picture && { picture }),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/edit_post/${postData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPost),
            });

            if (response.ok) {
                Swal.fire(
                    'Success!',
                    'Post updated successfully!',
                    'success'
                );
                // Optionally clear form fields
            } else {
                Swal.fire(
                    'Error!',
                    'Failed to update post.',
                    'error'
                );
            }
        } catch (error) {
            console.error("Error updating post:", error);
            Swal.fire(
                'Error!',
                'An error occurred while updating the post.',
                'error'
            );
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="card w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Post</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="label">Title</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">Author</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            readOnly={user !== null} // Make it read-only if the user is logged in
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">Content</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-64"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="label">Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">Category</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">Picture URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn bg-green-600 hover:bg-green-400 text-white font-semibold w-full">Update Post</button>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
