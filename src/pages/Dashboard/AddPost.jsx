import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";

const AddPost = () => {
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(user?.displayName || ""); // Pre-fill with user's display name if available
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [picture, setPicture] = useState("");
    const [comments, setComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            author,
            content,
            date,
            tags: tags.split(",").map(tag => tag.trim()),
            category,
            picture,
            comments,
        };

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
            if (response.ok) {
                alert("Post added successfully!");
                // Optionally reset form
                setTitle("");
                setAuthor(user?.displayName || ""); // Reset author field with user's display name
                setContent("");
                setDate("");
                setTags("");
                setCategory("");
                setPicture("");
                setComments([]);
            } else {
                alert("Failed to add post.");
            }
        } catch (error) {
            console.error("Error adding post:", error);
            alert("An error occurred while adding the post.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="card w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Post</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary w-full">Add Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
