package dev.airlines.system.airlines.responsemodels;

import dev.airlines.system.airlines.entity.FlightEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class ShelfCurrentBookingsResponse {


    private FlightEntity flightEntity;
    private String booking_date;
    private String booking_status;


}
