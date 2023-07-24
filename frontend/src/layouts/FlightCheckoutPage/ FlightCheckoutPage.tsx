import FlightModel from "../../models/FlightModel";
import React, {useEffect, useState} from "react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckOutAndReviewBox} from "./CheckOutAndReviewBox";

export const FlightCheckoutPage = () => {

    const [flight, setFlight] = useState<FlightModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);

    const flightId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = ` http://localhost:8080/api/v1/flights/${flightId}`;

            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseJson = await response.json();


                const loadedflight: FlightModel = {
                    flight_id: responseJson.id,
                    departure_date: responseJson.departure_date,
                    departure_from: responseJson.departure_from,
                    destination: responseJson.destination,
                    flight_time: responseJson.flight_time,
                    average_rating: responseJson.average_rating,
                    price_business: responseJson.price_business,
                    price_economy: responseJson.price_economy,
                    no_seats_reserved_business: responseJson.no_seats_reserved_business,
                    no_seats_reserved_economy: responseJson.no_seats_reserved_economy,
                }
                const responseData = responseJson; // there is correct data returned from API

                setFlight(responseData);
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
      <div>

          <div className='container d-none d-lg-block'>
              <div className='row mt-5'>
                  <div className='col-sm-2 col-md-3'>
                      <img src={require('../flights.jpg')}
                           width='550'
                           height='400'
                           alt="Flight"
                      />
                  </div>
                  <div className='col-4 col-md-4 container'>
                      <div className='ml-2'>
                          <h5 className='text-primary'>{flight?.destination}</h5>
                          <h3>{flight?.departure_from}</h3>
                          <p className='lead'> {flight?.departure_date}</p>
                          <p className='lead'> {flight?.flight_time}h</p>
                          <StarsReview rating={2.5} size={32}/>
                      </div>
                  </div>
                  <CheckOutAndReviewBox flight={flight} mobile={false}/>
              </div>
              <hr/>
              <div className='row mt-5'>
                  <div className='col-sm-2 col-md-3'>
                      <img src={require('../flights.jpg')}
                           width='550'
                           height='400'
                           alt="Flight"
                      />
                  </div>
                  <div className='col-4 col-md-4 container'>
                      <div className='ml-2'>
                          <h5 className='text-primary'>{flight?.destination}</h5>
                          <h3>{flight?.departure_from}</h3>
                          <p className='lead'> {flight?.departure_date}</p>
                          <p className='lead'> {flight?.flight_time}h</p>
                          <StarsReview rating={2.5} size={32}/>
                      </div>
                  </div>
                  <CheckOutAndReviewBox flight={flight} mobile={false}/>
              </div>
              <hr/>
          </div>
    <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
            <img src={require('../flights.jpg')}
                 width='226'
                 height='349'
                 alt="Flight"
            />
        </div>
        <div className='mt-4'>
            <div className='ml-2'>
                <h5 className='text-primary'>{flight?.destination}</h5>
                <h3>{flight?.departure_from}</h3>
                <p className='lead'> {flight?.departure_date}</p>
                <p className='lead'>{flight?.flight_time}</p>
            </div>
        </div>
        <CheckOutAndReviewBox flight={flight} mobile={true}/>
        <hr/>
    </div>
      </div>
    );
}