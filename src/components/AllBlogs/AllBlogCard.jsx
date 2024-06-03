import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AllBlogCard = ({ post }) => {
    // eslint-disable-next-line react/prop-types
    const {id, picture, title, content, category, tags, author, date } = post;

    // Helper function to truncate text
    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    return (
        <div className="m-4">
            <div className="card card-side bg-base-100 shadow-xl flex-col md:flex-row">
                <figure className="w-full md:w-1/3">
                    <img src={picture} alt={title} className="h-full w-full rounded-xl object-cover" />
                </figure>
                <div className="card-body p-4 md:p-6 w-full md:w-2/3">
                    <h2 className="card-title text-2xl font-bold">{truncateText(title, 50)}</h2>
                    <p className="text-gray-700 my-2">{truncateText(content, 100)}</p>
                    <p className="text-sm text-gray-500">Category: {category}</p>
                    <div className="my-2">
                       {/* eslint-disable-next-line react/prop-types */}
                        {tags?.map((tag, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <h3 className="text-sm text-gray-700">{author}</h3>
                            <h4 className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</h4>
                        </div>
                        <div className="card-actions">
                            <Link to={`/card_details/${id}`} className="btn bg-green-600 hover:bg-green-400 border-none text-white font-semibold">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBlogCard;
