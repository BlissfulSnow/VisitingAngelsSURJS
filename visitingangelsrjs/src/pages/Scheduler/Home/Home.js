// src/pages/scheduler/Home/Home.js

import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../Components/Profile/Profile';
function Home() {

    const { isLoading, error } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
    <div>
        <h1>Home Page</h1>
            <p>Successfully authenticated! Welcome To Home Page</p>
            <Profile />
    </div>
    );
}

export default Home;
