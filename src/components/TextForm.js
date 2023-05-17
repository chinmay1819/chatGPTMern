import React, { useState } from 'react'
import axios from "axios";

const TextForm = (props) => {
    const [text, setText] = useState('');
    const baseURL = 'http://localhost:5000/ask';
    const [post, setPost] = useState('');

    const handleReadClick = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
    }
    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
    }
    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const createPost = () => {
        axios
            .post(baseURL, {
                message: text
            })
            .then((response) => {

                let answer = response.data.completion;
                setPost(answer);

            });
    }

    const handleClearText = () => {
        setText('');
    }
    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows='8' ></textarea>
                </div>
                <button className='btn btn-primary mx-1' onClick={createPost}>Send</button>
                <button className='btn btn-primary mx-1' onClick={handleClearText}>Clear</button>


            </div>
            <div className='container my-2'>
                <h4>Response from ChatGPT </h4>
                <p>

                    {post}
                </p>

            </div>
        </>
    )
}

export default TextForm
