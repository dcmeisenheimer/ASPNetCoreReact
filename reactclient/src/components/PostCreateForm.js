//Create Form 
import React, { useState } from 'react'
import Constants from '../utilities/Constants'

//Create Form Componenet
export default function PostCreateForm(props) {

    //What is initially in the form
    const initialFormData = Object.freeze({
        title: '',
        content: ''
    });

    const [formData, setFormData] = useState(initialFormData);

    //Gets the event handler from onChange
    const handleChange = (e) => {
        setFormData({
            //Setting property in form data to the same name as input element
            ...formData,
            [e.target.name]: e.target.value, //Title is the value the user gave in

        });
    };

    //Gets the event handler on submit from onChange
    const handleSubmit = (e) => {
        //Prevents defualt handler from being submitted
        e.preventDefault();

        //Sets the post to create values 
        const postToCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.APL_URL_CREATE_POST;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            //Asynchrounus JS
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            //Catch error and alert the user through alert
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onPostCreated(postToCreate);
    };

    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create new post</h1>

            <div className='mt-5'>
                <label className='h3 form-label'>Post title</label>
                <input value={formData.title} name='title' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Post content</label>
                <input value={formData.content} name='content' type='text' className='form-control' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Submit</button>
            <button onClick={() => props.onPostCreated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancel</button>
        </form>
    );
}

