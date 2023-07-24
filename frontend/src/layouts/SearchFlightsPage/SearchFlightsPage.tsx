import {useEffect, useState} from "react";
import FlightModel from "../../models/FlightModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {SearchFlight} from "./Components/SearchFlight";
import {Pagination} from "../Utils/Pagination";

export const SearchFlightsPage = () => {

    const [flights, setFlights] = useState<FlightModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string | null>(null);
   // const [currentPage, setCurrentPage] = useState(1)
    //const [flightsPerPage, setFlightsPerPage] = useState(5);
    const [totalAmountOfFlights, setTotalAmountOfFlights] = useState(0);
    //const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
     const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = "http://localhost:8080/api/v1/flights";
            let url: string;
        if(searchUrl === ''){
            url = baseUrl + '/all';
        }else{
            url =baseUrl + searchUrl;
        }



            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseData =  await response.json(); // there is correct data returned from API
             //   setTotalAmountOfFlights(responseData.page.totalElements);
             //   setTotalPages(responseData.page.totalPages);
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
                    setTotalAmountOfFlights(loadedFlights.length);
                    setIsLoading(false);


                }

            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };
        fetchFlights();
    }, [searchUrl]);
    if(isLoading){

        return (
            <SpinnerLoading/>
        )
    }


    const searchHandleChange = () => {

        if(search === ''){
            setSearchUrl('/all');
        }else{
            console.log("tu jestem");
            setSearchUrl(`/specific-departure-flight?departure_from=${search}`);

        }
    }


    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    //const indexOfLastFlight : number = currentPage * flightsPerPage;
   // const indexOfFirstFlight : number = indexOfLastFlight - flightsPerPage;
   // let lastItem = flightsPerPage * currentPage <= totalAmountOfFlights ?
      //  flightsPerPage * currentPage : totalAmountOfFlights;

   // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return(
        <div>
            <div className="container">
                <div>
                   <div className="row mt-5">
                       <div className="col-6">
                           <div className='d-flex'>
                               <input className='form-control me-2' type='search'
                                      placeholder='Departure from' aria-labelledby='Search'
                                      onChange={e=> setSearch(e.target.value)}/>
                               <input className='form-control me-2' type='search'
                                      placeholder='destination' aria-labelledby='Search'/>

                               <button className='btn btn-outline-success' onClick={()=>searchHandleChange()}>Search</button>
                           </div>
                       </div>
                       <div className="col-4">
                           <div className='dropdown'>
                                 <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                     Passengers
                                 </button>
                               <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                   <li>
                                       <a className='dropdown-item' href='#'>
                                           1
                                       </a>
                                   </li>
                                   <li>
                                       <a className='dropdown-item' href='#'>
                                           2
                                       </a>
                                   </li>
                                   <li>
                                       <a className='dropdown-item' href='#'>
                                           3
                                       </a>
                                   </li>
                                   <li>
                                       <a className='dropdown-item' href='#'>
                                           4
                                       </a>
                                   </li>
                                   <li>
                                       <a className='dropdown-item' href='#'>
                                           5
                                       </a>
                                   </li>
                               </ul>
                           </div>
                       </div>

                   </div>
                    {totalAmountOfFlights>0?
                        <>
                    <div className='mt-3'>
                    <h5>Number of results: ({totalAmountOfFlights})</h5>
                    </div>
                    {flights.map(flight => (
                        <SearchFlight flight={flight} key={flight.flight_id}/>
                        ))}
                </>
                 :
                        <div className='m-5'>
                            <h3>Can't find what you are looking for ?</h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                               href='#'>Airplane Services</a>
                        </div>
                    }
               { //totalPages > 1 &&
                       //<Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}