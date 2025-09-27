import React, { useEffect } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPostThunk } from '../features/posts/postSlice';

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.entries);

    useEffect(() => {
        dispatch(getPostThunk());
    }, []);

    return (
        <section className='center'>
            <PostForm />
            <PostList posts={posts} />
        </section>
    );
}

export default Home;