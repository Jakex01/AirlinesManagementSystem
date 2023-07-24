import React from 'react';
import './App.css';
import {Navbar1} from "./layouts/NavbarAndFooter/Navbar1";
import {Footer} from "./layouts/NavbarAndFooter/Footer";
import {HomePage} from "./layouts/HomePage/HomePage";
import {SearchFlightsPage} from "./layouts/SearchFlightsPage/SearchFlightsPage";
import {Route, Routes} from "react-router-dom";
import {FlightCheckoutPage} from "./layouts/FlightCheckoutPage/ FlightCheckoutPage";



export const  App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar1/>
            <div className='flex-grow-1'>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/search' element={<SearchFlightsPage/>}/>
                <Route path='/checkout/:flightId' element={<FlightCheckoutPage/>}/>
            </Routes>
            </div>
            <Footer/>
        </div>

    );
}

