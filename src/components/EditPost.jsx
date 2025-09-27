import React from 'react';
import PostForm from './PostForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {

    const { postId } = useParams();

    const posts = useSelector(state => state.posts.entries);
    const post = posts.find(post => post.id == postId);


    return (
        <section className='center'>
            <PostForm post={post} />
        </section>
    );
}

export default EditPost;