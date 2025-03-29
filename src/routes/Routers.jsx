import React from 'react';
import { Route, Routes } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Login/Login';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Users from '../pages/Users/Users';

const Routers = () => {
    return (
        <Routes>
            <Route
                index
                element={<LandingPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={<MainLayout />}
            >
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />
                {/* <Route
                    path="/posts"
                    element={<Posts />}
                />
                <Route path="/post/:id" element={<PostDetails />} /> */}
            </Route>
        </Routes>
    );
};

export default Routers;