import FlightModel from "../../../models/FlightModel";
import React from "react";
import {Link} from "react-router-dom";

export const SearchFlight:React.FC<{flight: FlightModel}> = (props) => {



    return(
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2 '>

                <div className='d-none d-lg-block'>
                    <img src={require('../flights.jpg')}
                         width='200'
                         height='196'
                         alt="Flight"
                    />

                </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        <img src={require('../flights.jpg')}
                             width='200'
                             height='196'
                             alt="Flight"
                        />
                    </div>
            </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.flight.destination}</h5>
                        <h4>{props.flight.departure_from}</h4>
                        <p className='card-text'>
                            Price stating of : {props.flight.price_economy}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-md main-color text-white' to={`/checkout/${props.flight.flight_id}`}>
                        View details
                    </Link>
                </div>
            </div>
        </div>
    )
}