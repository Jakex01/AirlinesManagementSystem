import {PiAirplaneTakeoffFill} from "react-icons/pi";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const Navbar1 = () => {

        const {oktaAuth, authState} = useOktaAuth();


        if(!authState)
        {
            return <SpinnerLoading/>;
        }

        const handleLogut = async () => oktaAuth.signOut();

        console.log(authState);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <div className='brand-name'>
                    <PiAirplaneTakeoffFill size={40} color='white'/>
                    <span className='navbar-brand'>JxAirlines</span>
                </div>

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link active' aria-current='page' to='/home'>
                                Home
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link active' aria-current='page' to='/search'>
                                Flights
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link active' aria-current='page' to='/bookings'>
                                Manage booking
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link active' aria-current='page' href='/#'>
                                Your flights
                            </a>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login        '>
                                    Sign in
                                </Link>
                            </li>
                            :
                            <li>
                               <button className='btn btn-outline-light' onClick={handleLogut}>Logout</button>
                            </li>

                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}