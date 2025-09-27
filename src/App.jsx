import React from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Posts from './components/Posts';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css';
import PostForm from './components/PostForm';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <div className='page-center'>
      <Router>

        <Nav />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='about' element={<About />} />
          <Route exact path='contact' element={<Contact />} />
          <Route path='postList' element={<PostList />} />
          <Route path='postForm' element={<PostForm />} />
          <Route path='editpost/:postId' element={<EditPost />} />
        </Routes >

      </Router >
    </div>
  );
};

export default App;;




