import { useEffect, useState } from 'react';
import NewBlogCard from './NewBlogCard';

// eslint-disable-next-line react/prop-types
const NewBlog = ({ limit }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/posts`)
            .then(res => res.json())
            .then(data => {
                // Sort posts by date in descending order
                const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                // Slice the array to get only the desired number of posts
                setPosts(sortedPosts.slice(0, limit));
            });
    }, [limit]);

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold text-center my-8 text-green-600">Recent Blogs</h2>
            <div className="flex justify-center items-center mx-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <NewBlogCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewBlog;

