import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./EditPost.scss";

const EditPost = () => {
    const [post, setPost] = useState({
        title: "",
        desc: "",
        image: "",
        cat: ""
    });
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosInstance.get(`/posts/${params.postId}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        fetchPost();
    }, [params.postId]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/posts/${params.postId}`, post);
            navigate(`/home/post/${params.postId}`);
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-post">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="desc"
                        value={post.desc}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={post.image}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="cat"
                        value={post.cat}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
