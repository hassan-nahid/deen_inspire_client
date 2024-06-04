import { useEffect, useState } from "react";
import AllBlogCard from "../components/AllBlogs/AllBlogCard";

const AllBlog = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setFilteredPosts(data);
            });
    }, []);

    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="max-w-screen-xl mx-auto mb-10 mt-4">
            <div className="mx-3">
                <div className="my-10 flex gap-3">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search by title"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className="flex flex-col gap-3">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => <AllBlogCard key={post._id} post={post} />)
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllBlog;
