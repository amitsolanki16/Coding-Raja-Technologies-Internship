import { useHistory, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { axiosInstance } from "../../config";

const Write = () => {
    const history = useHistory();
    const { postId } = useParams();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                try {
                    const res = await axiosInstance.get(`/posts/${postId}`);
                    setInitialData(res.data);
                } catch (error) {
                    console.error("Error fetching post data", error);
                }
            };
            fetchPost();
        }
    }, [postId]);

    const fetchHandler = async (data) => {
        try {
            if (postId) {
                await axiosInstance.put(`/posts/${postId}`, data);
            } else {
                await axiosInstance.post("posts", data);
            }
            history.replace("/home");
        } catch (error) {
            console.error("Error saving post", error);
        }
    };

    return (
        <Fragment>
            <Form onOrder={fetchHandler} initialData={initialData} />
        </Fragment>
    );
};

export default Write;
