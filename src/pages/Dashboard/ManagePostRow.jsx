import { Link } from "react-router-dom";

const ManagePostRow = ({ post, index, onDelete }) => {
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={post?.picture} alt="Post" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{post?.title}</div>
                        <div className="text-sm opacity-50">{post?.author}</div>
                    </div>
                </div>
            </td>
            <td>
                {post?.category}
                <br />
                <span className="badge badge-ghost badge-sm">{post?.tags?.join(", ")}</span>
            </td>
            <td>{post?.date}</td>
            <th className="flex flex-wrap gap-1">
                <Link to={`/card_details/${post?._id}`} className="btn text-white btn-primary btn-xs">Details</Link>
                <Link to={`/dashboard/edit_post/${post?._id}`} className="btn text-white btn-warning btn-xs">Edit</Link>
                <button onClick={() => onDelete(post?._id)} className="btn text-white btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default ManagePostRow;
