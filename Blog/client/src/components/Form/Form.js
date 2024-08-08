import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import "./Form.scss";

import write from "./write.png";

const Form = (props) => {
    const [picture, setPicture] = useState("");
    const titleRef = useRef();
    const textRef = useRef();
    const dateRef = useRef();
    const catRef = useRef();
    const imageRef = useRef();
    const user = useSelector(state => state.auth.user);

    // Pre-fill the form with initial data if provided
    useEffect(() => {
        if (props.initialData) {
            setPicture(props.initialData.image);
            titleRef.current.value = props.initialData.title || "";
            textRef.current.value = props.initialData.desc || "";
            dateRef.current.value = props.initialData.date || "";
            catRef.current.value = props.initialData.cat || "";
            imageRef.current.value = props.initialData.image || "";
        }
    }, [props.initialData]);

    const onChangePicture = () => {
        setPicture(imageRef.current.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const image = imageRef.current.value;
        const title = titleRef.current.value;
        const desc = textRef.current.value;
        const date = dateRef.current.value;
        const cat = catRef.current.value;

        const submitData = {
            image,
            title,
            desc,
            date,
            cat,
        };

        props.onOrder(submitData);
    };

    if (user) {
        return (
            <div className="write">
                <h2 className="write__heading">{props.initialData ? "Edit Blog" : "Add a Blog"}</h2>
                <form onSubmit={formSubmitHandler} className="write__form">
                    <div className="write__inputbox">
                        {picture && <img className="write__showImg" src={picture} alt="blog" />}
                        <input
                            ref={imageRef}
                            onChange={onChangePicture}
                            type="text"
                            className="write__imageLink"
                            placeholder="Upload image URL..."
                            required
                        />
                        <input
                            ref={catRef}
                            type="text"
                            className="write__cat"
                            placeholder="Category"
                            required
                        />
                        <input
                            type="text"
                            className="write__text"
                            placeholder="Title"
                            ref={titleRef}
                            required
                        />
                        <textarea
                            ref={textRef}
                            rows="4"
                            className="write__words"
                            placeholder="Write your Blog..."
                            required
                        />
                        <input
                            ref={dateRef}
                            type="date"
                            className="write__date"
                        />
                    </div>
                    <button className="write__submit">
                        {props.initialData ? "Update" : "Publish"}
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="notLog">
                <p className="notLog__message">SIGN IN to write a BLOG</p>
                <img src={write} alt="" className="notLog__img" />
            </div>
        );
    }
};

export default Form;
