import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';

function PostList({ posts }) {

    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(remove(id));
    };

    return (
        <section className='page-center'>
            <h1>Post List</h1>
            {
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