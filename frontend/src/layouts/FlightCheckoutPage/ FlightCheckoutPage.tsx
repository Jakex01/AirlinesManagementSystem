import FlightModel from "../../models/FlightModel";
import React, {useEffect, useState} from "react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckOutAndReviewBox} from "./CheckOutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import {LatestReviews} from "./LatestReviews";
import {useOktaAuth} from "@okta/okta-react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ReviewRequestModel from "../../models/ReviewRequestModel";
import submit = Simulate.submit;

export const FlightCheckoutPage = () => {

    const {authState} = useOktaAuth();

    const [flight, setFlight] = useState<FlightModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);


    const [review, setReview] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, isSetIsLoadingReview] = useState<boolean>(true);
    const flightId = (window.location.pathname).split('/')[2];

    const[isReviewLeft, setIsReviewLeft] = useState<boolean>(false);
    const[isLoadingUserReview, setIsLoadingUserReview] = useState<boolean>(true);



    const [isCheckout, setIsCheckout] = useState<boolean>(false);
    const[isLoadingFlightCheckout, setIsLoadingFlightCheckout] = useState<boolean>(true);

    const[currentLoansCount, SetCurrentLoansCount] = useState<number>(0);
    const[isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState<boolean>(true);
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = ` http://localhost:8080/api/v1/flights/secure/${flightId}`;

            try {
                const response = await fetch(baseUrl,requestOptions);

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
                console.log(responseData);
                setFlight(responseData);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchFlights();
    }, [isCheckout]);

    useEffect(()=>{

        const fetchFlightReviews = async () => {

            const baseUrl: string = ` http://localhost:8080/api/v1/reviews/secure/${flightId}`;

            const responseReviews = await fetch(baseUrl,requestOptions);

            if(!responseReviews.ok){
                throw new Error("Something went wrong!");
            }
            let weightedStarReviews: number = 0;
            const responseJson = await responseReviews.json();
            const loadedReviews: ReviewModel[] = [];
            for(const key in responseJson){
                loadedReviews.push({
                    id: responseJson[key].id,
                    user_email: responseJson[key].user_email,
                    review_description: responseJson[key].review_description,
                    review_date: responseJson[key].review_date,
                    flight_id: responseJson[key].flight_id,
                    review_rating: responseJson[key].review_rating,
                })
                weightedStarReviews += responseJson[key].rating;
            }
            if(loadedReviews){
                const round = (Math.round((weightedStarReviews/loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReview(loadedReviews);
            isSetIsLoadingReview(false);
        }

        fetchFlightReviews().catch((error: any) => {
            isSetIsLoadingReview(false);
            setHttpError(error.message);
        })
    },[isReviewLeft]);

    useEffect(() => {

        const fetchUserCurrentLoansCount = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/v1/flights/secure/current-loans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if(!currentLoansCountResponse.ok){
                    throw new Error("Something went wrong!");
                }
                const currentLoansCountJson = await currentLoansCountResponse.json();
                SetCurrentLoansCount(currentLoansCountJson);
            }
            setIsLoadingCurrentLoansCount(false);

        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })

    }, [authState, isCheckout]);

    useEffect(() => {

        const fetchUserCheckedOutFlights = async () => {

            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/v1/flights/secure/is-checked-out/by-user/${flightId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const flightCheckedOut = await fetch(url, requestOptions);

                if(!flightCheckedOut.ok){
                    throw new Error("Something went wrong!");
                }
                const flightCheckedOutJson = await flightCheckedOut.json();
                setIsCheckout(flightCheckedOutJson);

            }
            setIsLoadingFlightCheckout(false);

        }

        fetchUserCheckedOutFlights().catch((error: any) => {
            setIsLoadingFlightCheckout(false);
            setHttpError(error.message);
        })

    },[authState]);

    useEffect(() => {
       const fetchUserReviewFlight = async () => {

           if(authState?.isAuthenticated && authState.isAuthenticated) {
               const url = `http://localhost:8080/api/v1/reviews/secure/user/flight/${flightId}`;
               const userReview = await fetch(url, requestOptions);

               if (!userReview.ok) {
                   throw new Error("Something went wrong!");
               }

               const userReviewJson = await userReview.json();
               setIsLoadingUserReview(userReviewJson);
               if (userReviewJson) {
                   setIsReviewLeft(true);
               }
           }
           setIsLoadingUserReview(false);


       }
       fetchUserReviewFlight().catch((error:any)=>{
              setIsLoadingUserReview(false);
                setHttpError(error.message);
        })
    }, [authState]);


    if(isLoading || isLoadingCurrentLoansCount || isLoadingReview || isLoadingFlightCheckout || isLoadingUserReview){
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

    async function checkoutFlight(){
        const url = `http://localhost:8080/api/v1/flights/secure/checkout-flight/${flightId}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);

        if(!checkoutResponse){
            throw new Error('Something went wrong!');
        }
        setIsCheckout(true);
    }


    async function submitReview(starInput: number, review_description: string){
        let flight_id = parseInt(flightId);

        if(flight?.flight_id){
          //  flight_id = flight.flight_id;
        }
        const reviewRequestModel = new ReviewRequestModel(starInput ,flight_id,review_description);
        const url = `http://localhost:8080/api/v1/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);

        if(!returnResponse){
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }


    return(
      <div>

          <div className='container d-none d-lg-block'>
              <div className='row mt-5'>
                  <div className='col-sm-2 col-md-3'>
                      <img src={require('../flights.jpg')}
                           width='350'
                           height='300'
                           alt="Flight"
                      />
                  </div>
                  <div className='col-4 col-md-4 container'>
                      <div className='ml-2'>
                          <h5 className='display-5'>{flight?.departure_from}</h5>
                          <h3 className='text-primary display-3'>{flight?.destination}</h3>
                          <p><u style={{ fontSize: '20px' }}>{flight?.departure_date}</u></p>
                          <p className='lead' style={{ fontSize: '25px' }}> {flight?.flight_time}h</p>
                          <StarsReview rating={totalStars} size={32}/>
                      </div>
                  </div>
                  <CheckOutAndReviewBox flight={flight} mobile={false}
                                        currentLoansCount={currentLoansCount}
                                        isAuthenticated={authState?.isAuthenticated}
                                        isCheckedOut={isCheckout}
                                        isReviewLeft={isReviewLeft}
                                        submitReview={submitReview}
                  checkoutFlight={checkoutFlight}/>
              </div>
              <hr/>
              <LatestReviews review={review} flight_id={parseInt(flightId)} mobile={false}/>

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
        <CheckOutAndReviewBox flight={flight} mobile={true}
                              currentLoansCount={currentLoansCount}
                              isAuthenticated={authState?.isAuthenticated}
                              isCheckedOut={isCheckout}
                              isReviewLeft={isReviewLeft}
                              submitReview={submitReview}
        checkoutFlight={checkoutFlight}/>
        <hr/>
        <LatestReviews review={review} flight_id={flight?.flight_id} mobile={true}/>
    </div>
      </div>
    );
}