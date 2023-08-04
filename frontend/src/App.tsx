import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import AuthRedirect from './hok/AuthRedirect';
import { useDispatch } from 'react-redux';
import { fetchMe } from './redux/feature/auth';
import { AppDispatch } from './redux/store';

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
            path="/add-post"
            element={
              <AuthRedirect>
                <AddPost />
              </AuthRedirect>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<div>404 page not found</div>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
