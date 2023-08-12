package dev.airlines.system.airlines.controller;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.responsemodels.ShelfCurrentBookingsResponse;
import dev.airlines.system.airlines.service.FlightService;
import dev.airlines.system.airlines.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/secure/all")
    public List<FlightEntity> getAllFlights(@RequestHeader(value="Authorization") String token) {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.getAllFlights();
    }

    @GetMapping("/secure/specific-departure-flight")
    public List<FlightEntity> findByDepartureFrom(@RequestHeader(value="Authorization") String token,@RequestParam("departure_from") String departure_from) {

        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.findByDepartureFrom(departure_from);
    }


    @PostMapping("/add-flight")
    public void addFlight(@RequestBody FlightEntity flight) {
        flightService.addFlight(flight);
    }

    @GetMapping("/secure/{id}")
    public Optional<FlightEntity> getFlightById(@RequestHeader(value="Authorization") String token, @PathVariable Long id) {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.getFlightById(id);
    }

    @PutMapping("/secure/checkout-flight/{id}")
    public FlightEntity checkoutFlight(@RequestHeader(value="Authorization") String token,@PathVariable Long id) throws Exception {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.checkoutFlight(user_email, id);
    }

    @GetMapping("/secure/is-checked-out/by-user/{id}")
    public Boolean checkoutBookByUser(@RequestHeader(value="Authorization") String token, @PathVariable Long id) throws Exception {
        String user_email = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        return flightService.checkoutFlightByUser(user_email, id);
    }
    @GetMapping("/secure/current-loans/count")
    public Integer getCurrentLoansCount(@RequestHeader(value="Authorization") String token) {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.currentLoansCount(user_email);
    }
    @GetMapping("/secure/current-loans")
    public List<ShelfCurrentBookingsResponse> getCurrentLoans(@RequestHeader(value="Authorization") String token) throws Exception {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return flightService.currentBookings(user_email);
    }

}

