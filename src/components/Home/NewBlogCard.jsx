import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NewBlogCard = ({ post }) => {
    // eslint-disable-next-line react/prop-types
    const {_id, picture, title, content, author, date, tags } = post;

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    return (
        <div className="max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
            <img className="w-full h-64 object-cover object-center" src={picture} alt={title} />
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">{truncateText(title, 50)}</h2>
                <p className="text-gray-700 text-base">{truncateText(content, 150)}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="text-gray-600 text-sm">Posted by {author} on {new Date(date).toLocaleDateString()}</p>
                <div className="my-3">
                    {/* eslint-disable-next-line react/prop-types */}
                    {tags && tags?.length > 0 && (
                        <div>
                            {/* eslint-disable-next-line react/prop-types */}
                            {tags?.map((tag, index) => (
                                <span key={index} className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="my-3">
                    <Link to={`/card_details/${_id}`} className="btn bg-green-600 hover:bg-green-400 border-none text-white font-semibold">See More</Link>
                </div>
            </div>
        </div>
    );
};

export default NewBlogCard;
