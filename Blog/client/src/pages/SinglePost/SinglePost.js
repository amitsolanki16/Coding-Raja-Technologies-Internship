import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentBox from "../../components/CommentBox/CommentBox";
import { axiosInstance } from "../../config";
import "./SinglePost.scss";

const SinglePost = () => {
  const [loadedBlog, setLoadedBlog] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const singleFetch = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${params.postId}`);
        setLoadedBlog(res.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    singleFetch();
  }, [params.postId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/posts/${params.postId}`);
      history.push("/home"); // Redirect to home page or posts list after deletion
    } catch (error) {
      console.error("Error deleting post", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="single">
      <div className="single__simg">
        <img src={loadedBlog.image} alt={loadedBlog.title} className="single__simg1" />
      </div>

      <div className="single__titlebox">
        <h2 className="single__title">{loadedBlog.title}</h2>
        <span className="single__date">{loadedBlog.date}</span>
        <p className="single__para">{loadedBlog.desc}</p>
        <div className="single__button-group">
          <button
            className="single__delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            className="single__edit-button"
            onClick={() => history.push(`/write/${params.postId}`)}
          >
            Edit
          </button>
        </div>
      </div>

      <CommentBox postId={params.postId} />
    </div>
  );
};

export default SinglePost;
