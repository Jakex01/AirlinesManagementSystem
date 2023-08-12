import ShelfCurrentBookings from "../../../models/ShelfCurrentBookings";
import React from "react";

export const BookingsModal: React.FC<{shelfCurrentBookings: ShelfCurrentBookings, mobile: boolean}> = (props) => {



    return(
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.shelfCurrentBookings.flight?.flight_id}` :
        `modal${props.shelfCurrentBookings.flight?.flight_id}`} data-bs-backdrop='static' data-bs-keyboard='false'
        aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentBookings.flight?.flight_id}>
        <div className='modal-dialog'>
            <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                    Booking Options
                </h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'>

                </button>
            </div>
            <div className='modal-body'>
                <div className='container'>
                    <div className='mt-3'>
                    <div className='row'>
                        <div className='col-2'>
                            <h5>Here should be an image!!!!!!!!</h5>
                        </div>
                        <div className='col-10'>
                            <h6>{props.shelfCurrentBookings.flight.departure_from}</h6>
                            <h4>{props.shelfCurrentBookings.flight.destination}</h4>
                        </div>
                    </div>
                    </div>
                    <hr/>
                    <p className='text-secondary'>
                        Your exciting flight is: {props.shelfCurrentBookings.flight.departure_date}
                    </p>
                    <div className='list-group mt-3'>
                        <button data-bs-dismiss='modal' className='list-group-item list-group-item-action'
                        aria-current='true'>
                            Check in
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}