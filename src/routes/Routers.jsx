import React from 'react';
import { Route, Routes } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';

const Routers = () => {
    return (
        <Routes>
            <Route
                index
                element={<LandingPage />}
            />
            {/* <Route
                path="/"
                element={<MainLayouts />}
            >
                <Route
                    path="/posts"
                    element={<Posts />}
                />
                <Route path="/post/:id" element={<PostDetails />} />
            </Route> */}
        </Routes>
    );
};

export default Routers;