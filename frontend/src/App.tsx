import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import AuthRedirect from './hok/AuthRedirect';
import { fetchMe } from './redux/feature/auth';
import { AppDispatch } from './redux/store';
import { Tag } from './pages/Tag';
import { UserPosts } from './pages/UserPosts';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts/:id"
            element={
              <AuthRedirect>
                <FullPost />
              </AuthRedirect>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <AuthRedirect>
                <AddPost />
              </AuthRedirect>
            }
          />
          <Route
            path="/add-post"
            element={
              <AuthRedirect>
                <AddPost />
              </AuthRedirect>
            }
          />
          <Route path="/tags/:id" element={<Tag />} />
          <Route path="/userPosts/:id" element={<UserPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<div>404 page not found</div>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
