import {useOktaAuth} from "@okta/okta-react";
import React, {useEffect, useState} from "react";
import ShelfCurrentBookings from "../../../models/ShelfCurrentBookings";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";

export const Bookings = () => {

    const {authState} = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const [shelfCurrentBookings, setShelfCurrentBookings] = useState<ShelfCurrentBookings[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUserCurrentBookings = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/v1/flights/secure/current-loans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const currentBookingsResponse = await fetch(url, requestOptions);
                if (!currentBookingsResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const currentBookingsData = await currentBookingsResponse.json();
                if (currentBookingsData) {

                    const loadedBookings: ShelfCurrentBookings[] = currentBookingsData.map((booking: any) => ({
                        flight:  booking.flightEntity ?{

                            flight_id: booking.flightEntity.id,
                            departure_date: booking.flightEntity.departure_date,
                            departure_from: booking.flightEntity.departure_from,
                            destination: booking.flightEntity.destination,
                            flight_time: booking.flightEntity.flight_time,
                            price_business: booking.flightEntity.price_business,
                            price_economy: booking.flightEntity.price_economy,
                            no_seats_reserved_business: booking.flightEntity.no_seats_reserved_business,
                            no_seats_reserved_economy: booking.flightEntity.no_seats_reserved_economy,
                        } : null ,
                        booking_date: booking.booking_date,
                        booking_status: booking.booking_status,
                    }));
                    const fliteredBookings = loadedBookings.filter(booking => booking.booking_status?.toLowerCase() === "current");

                    setShelfCurrentBookings(fliteredBookings);
                }
                setIsLoading(false);
            }
        };

        fetchUserCurrentBookings().catch((error:any) => {
            setHttpError(error.message);
            setIsLoading(false);
        });
    }, );

    if(isLoading){
      return( <SpinnerLoading/>
      )
    }
    if (httpError) {
        return (
            <div className='container'>
                <p>{httpError}</p>
            </div>
        );
    }

    return(
        <div className='mt-2'>
            {shelfCurrentBookings.length > 0 ?
                <>
                    <h3>Your flights:</h3>

                    {shelfCurrentBookings.map(booking => (

                        <div key={booking.flight.flight_id}>
                            <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                                <div className='row g-0'>
                                    <div className='col-md-2'>
                                        <div className='d-none d-lg-block'>
                                            <img src={require('../flights.jpg')}
                                                 width='200'
                                                 height='196'
                                                 alt="Flight"
                                            />
                                        </div>

                                    </div>
                                    <div className='col'>
                                        <div className='card-body'>
                                            <h4 className='card-title'>TO:  {booking.flight.destination} </h4>
                                            <h4> FROM: {booking.flight.departure_from}</h4>
                                            <p className='card-text'>{booking.flight.departure_date}</p>
                                            <hr/>
                                            <p className='card-text'> Flight time: {booking.flight.flight_time}</p>
                                            <p className='card-text'> Average rating: {booking.flight.average_rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </>
                :
                <>
                    <h3 className='mt-3'>Currently there is no flight </h3>
                    <Link className='btn btn-primary' to={'/search'}>
                        Find new flight
                    </Link>
                </>
            }

        </div>
    );
}