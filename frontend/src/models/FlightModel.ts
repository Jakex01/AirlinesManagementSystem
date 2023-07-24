

class FlightModel {
    flight_id: number;
    departure_from: string;
    destination: string;
    no_seats_reserved_business: number;
    no_seats_reserved_economy: number;
    price_business: number;
    price_economy: number;
    departure_date: string;
    flight_time: number;
    average_rating: number;


    constructor(flight_id: number, departure_from: string, destination: string, no_seats_reserved_business: number, no_seats_reserved_economy: number, price_business: number, price_economy: number, departure_date: string, flight_time: number, average_rating: number) {
        this.flight_id = flight_id;
        this.departure_from = departure_from;
        this.destination = destination;
        this.no_seats_reserved_business = no_seats_reserved_business;
        this.no_seats_reserved_economy = no_seats_reserved_economy;
        this.price_business = price_business;
        this.price_economy = price_economy;
        this.departure_date = departure_date;
        this.flight_time = flight_time;
        this.average_rating = average_rating;
    }
}

export default FlightModel;