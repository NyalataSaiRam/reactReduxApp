import React from 'react';
import { Link } from 'react-router-dom';

function Posts() {
    return (
        <div>
            <Link to={"postList"}>nested post list</Link>
        </div>
    );
}

export default Posts;