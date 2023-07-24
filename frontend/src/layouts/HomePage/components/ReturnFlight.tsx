import React from "react";
import FlightModel from "../../../models/FlightModel";
export const ReturnFlight: React.FC<{flight: FlightModel}> = (props) =>{

return(
    <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
        <div className='text-center'>

            <img src={require('../flights.jpg')}
                 width='151'
                 height='233'
                 alt="flight"
            />
            <h6 className='mt-2' style={{ fontSize: '25px', color: '#29335c' }}>
                {props.flight.destination}
                   </h6>
            <p>{props.flight.departure_from}</p>
            <a className='btn main-color text-white' href="#">Reserved</a>
        </div>
    </div>
);
}