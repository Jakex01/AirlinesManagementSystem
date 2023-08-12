import React from 'react';
import './App.css';
import { Navbar1 } from "./layouts/NavbarAndFooter/Navbar1";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchFlightsPage } from "./layouts/SearchFlightsPage/SearchFlightsPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FlightCheckoutPage } from "./layouts/FlightCheckoutPage/ FlightCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {ManageFlightsPage} from "./layouts/ManageFlightsPage/ManageFlightsPage";
import {MessagesPage} from "./layouts/MessagesPage/MessagePage";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
    const navigate = useNavigate();

    const customAuthHandler = () => {
        navigate('/login');
    };

    const restoreOriginUri = async (_oktaAuth: OktaAuth, originalUri: any) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <div className='d-flex flex-column min-vh-100'>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginUri} onAuthRequired={customAuthHandler}>
                <Navbar1 />
                <div className='flex-grow-1'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/search' element={<SearchFlightsPage />} />
                        <Route path='/checkout/:flightId' element={<FlightCheckoutPage />} />
                        <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
                        <Route path='/login/callback' element={<LoginCallback />} />
                        <Route path='/bookings' element={<ManageFlightsPage/>} />
                        <Route path='/messages' element={<MessagesPage/>} />
                    </Routes>
                </div>
                <Footer />
            </Security>
        </div>
    );
};
