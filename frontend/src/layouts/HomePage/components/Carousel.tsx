import {ReturnFlight} from "./ReturnFlight";
import FlightModel from "../../../models/FlightModel";
import {useEffect, useState} from "react";
import flightModel from "../../../models/FlightModel";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";
export const Carousel = () => {
    const [flights, setFlights] = useState<FlightModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = "http://localhost:8080/api/v1/flights/all";

            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseJson = await response.json();
                const responseData = responseJson; // there is correct data returned from API
                console.log(responseData);
                if (responseData) {
                    const loadedFlights: FlightModel[] = responseData.map((flight: any) => ({
                        flight_id: flight.id,
                        departure_date: flight.departure_date,
                        departure_from: flight.departure_from,
                        destination: flight.destination,
                        flight_time: flight.flight_time,
                        price_business: flight.price_business,
                        price_economy: flight.price_economy,
                        no_seats_reserved_business: flight.no_seats_reserved_business,
                        no_seats_reserved_economy: flight.no_seats_reserved_economy,

                    }));
                    setFlights(loadedFlights);
                }

                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchFlights();
    }, []);


    if(isLoading){
        return (
         <SpinnerLoading/>
        )
    }
    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return(
        <div className='container mt-5' style={{height: 550}}>
            <div className='homepage-carousel-title'>
                <h3>Find Your Next Curious Adventure</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5
            d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}

                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {flights.slice(0, 3).map((flight) => (
                                <ReturnFlight flight={flight} key={flight.flight_id} />
                            ))}
                        </div>
                    </div>

                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {flights.slice(3,6).map(flight  => (
                                <ReturnFlight flight={flight} key={flight.flight_id}/>
                            ))}
                        </div>
                    </div>

                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {flights.slice(6, 9).map((flight) => (
                                <ReturnFlight flight={flight} key={flight.flight_id} />
                            ))}
                        </div>
                    </div>
                </div>
                    <button className='carousel-control-prev' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'> </span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-next-icon' aria-hidden='true'> </span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>

                {/* Mobile */}
                <div className='d-lg-none mt-3'>
                    <div className='row d-flex justify-content-center align-items-center'>
                        <ReturnFlight flight={flights[7]} key={flights[7].flight_id} />
                    </div>
                </div>
                <div className='homepage-carousel-title mt-3'>
                    <Link className='btn btn-outline-secondary btn-lg' to='search'>View more</Link>
                </div>
            </div>
    );
}