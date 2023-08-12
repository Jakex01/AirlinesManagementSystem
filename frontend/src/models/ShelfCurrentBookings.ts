import FlightModel from "./FlightModel";

class ShelfCurrentBookings{

    flight: FlightModel;
    booking_date: string;
    booking_status: string;

    constructor(flight: FlightModel, booking_date: string, booking_status: string){
        this.flight = flight;
        this.booking_date = booking_date;
        this.booking_status = booking_status;
    }
}

export default ShelfCurrentBookings;