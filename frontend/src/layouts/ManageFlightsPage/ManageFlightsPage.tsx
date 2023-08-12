import {Bookings} from "./components/Bookings";
import {useState} from "react";
import {History} from "./components/History";

export const ManageFlightsPage = () => {

    const [tabChanged, setTabChanged] = useState(false);


    return(

        <div className='container'>
            <div className='mt-3'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button
                            className='nav-link active'
                            id='nav-loans-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#nav-loans'
                            role='tab'
                            aria-controls='nav-loans'
                            aria-selected='true'
                        >
                            Bookings
                        </button>

                        <button
                            className='nav-link'
                            id='nav-history-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#nav-history'
                            type='button'
                            role='tab'
                            aria-controls='nav-history'
                            aria-selected='false'
                        >
                            Your Bookings History
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div
                        className='tab-pane fade show active'
                        id='nav-loans'
                        role='tabpanel'
                        aria-labelledby='nav-loans-tab'
                    >
                        <Bookings />
                    </div>
                    <div
                        className='tab-pane fade'
                        id='nav-history'
                        role='tabpanel'
                        aria-labelledby='nav-history-tab'
                    >
                        <History/>
                    </div>
                </div>
            </div>
        </div>

    );
}