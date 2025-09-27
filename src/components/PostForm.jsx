import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { create, update } from '../features/posts/postSlice';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

function PostForm({ post = null }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const FormInitialData = {
        id: post?.id || "",
        name: post?.name || "",
        description: post?.description || "",
        author: post?.author || ""
    };

    const [ formData, setFormData ] = useState(FormInitialData);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, [ e.target.name ]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        if (post) {
            const updatePost = {
                id: post.id,
                name: formData.name,
                description: formData.description,
                author: formData.author
            };
            dispatch(update(updatePost));
            navigate("/");

        } else {
            console.log('dispatching create');
            const newPost = {
                id: nanoid(),
                name: formData.name,
                description: formData.description,
                author: formData.author
            };
            dispatch(create(newPost));
            setFormData(FormInitialData);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={formData.name} onChange={handleChange} />
            <input type="text" name='description' value={formData.description} onChange={handleChange} />
            <input type="text" name='author' value={formData.author} onChange={handleChange} />
            <button >{
                post ? "update" : "create"
            }</button>
        </form>
    );
}

export default PostForm;