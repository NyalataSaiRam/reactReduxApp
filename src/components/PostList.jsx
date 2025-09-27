import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostThunk } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';

function PostList({ posts }) {

    const dispatch = useDispatch();
    const { status } = useSelector(state => state.posts);

    const handleClick = (id) => {
        dispatch(deletePostThunk(id));
    };

    return (
        <section className='page-center'>
            <h1>Post List</h1>
            {
                status === "loading" ?
                    <div>loading...</div> :
                    posts.map(post => (
                        <div key={post.id} className='page-center'>
                            <h2>Title : {post.name}</h2>
                            <h3>Description: {post.description}</h3>
                            <p>Author: {post.author}</p>
                            <button onClick={() => handleClick(post.id)}>delete</button>
                            <Link to={`/editpost/${post.id}`}>
                                <button>update</button>
                            </Link>

                        </div>
                    ))

            }


        </section>
    );
}

export default PostList;