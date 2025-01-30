// src/App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Scheduler/Components/Navbar/Navbar';
import Home from './pages/Scheduler/Home/Home';
import FindCaregiver from './pages/Scheduler/FindCaregiver/FindCaregiver';
import LoadData from './pages/Scheduler/LoadData/LoadData';
import Availability from './pages/Scheduler/Availability/Availability';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/FirstLogin/FirstLogin';
import CallbackPage from "./pages/Auth/CallbackPage";
import PageLoader from "./pages/Scheduler/Components/PageLoader/PageLoader";
import { AuthenticationGuard } from "./pages/Auth/AuthenticationGuard"; // this is used to make wrapping routes in authentication easy

import { useAuth0 } from "@auth0/auth0-react";

function App() {
    // fix any ui issues that could be caused by intermediate authentication. (replaced with loading page)
    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader />
            </div>
        );
    }

    return (
        <Router>
            {/* Conditionally render the Navbar only for routes other than "/login" */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <> { /* wrap route in AuthenticaionGuard and pass the prop */ }
                            <Navbar />
                            <Routes>
                                <Route path="/scheduler" element={<AuthenticationGuard component={Home} />} />
                                <Route path="/scheduler/find-caregiver" element={<AuthenticationGuard component={FindCaregiver} />} />
                                <Route path="/scheduler/loaddata" element={<AuthenticationGuard component={LoadData} />} />
                                <Route path="/scheduler/availability" element={<AuthenticationGuard component={Availability} />} />
                                <Route path="/callback" element={<CallbackPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
