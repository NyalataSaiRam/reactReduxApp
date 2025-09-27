import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk, updatePostThunk } from '../features/posts/postSlice';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

function PostForm({ post = null }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(state => state.posts);

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
            dispatch(updatePostThunk(updatePost));
            navigate("/");

        } else {
            console.log('dispatching create');
            const newPost = {
                id: nanoid(),
                name: formData.name,
                description: formData.description,
                author: formData.author
            };
            // dispatch(create(newPost));
            dispatch(createPostThunk(newPost));
            setFormData(FormInitialData);
        }

    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" name='name' value={formData.name} onChange={handleChange} />
                <input type="text" name='description' value={formData.description} onChange={handleChange} />
                <input type="text" name='author' value={formData.author} onChange={handleChange} />
                <button >{
                    post ? "update" : "create"
                }</button>
            </form>
            {
                status === "failed" &&
                <div>
                    {error}
                </div>
            }
        </div>
    );
}

export default PostForm;