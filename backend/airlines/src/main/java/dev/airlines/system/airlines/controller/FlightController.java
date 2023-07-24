package dev.airlines.system.airlines.controller;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.service.FlightService;
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

    @GetMapping("/all")
    public List<FlightEntity> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/specific-departure-flight")
    public List<FlightEntity> findByDepartureFrom(@RequestParam("departure_from") String departure_from){
        return flightService.findByDepartureFrom(departure_from);
    }

    @GetMapping("/specific-flight")
    public Optional<List<FlightEntity>> getSpecificFlight(@RequestBody  FlightEntity flightName) {
        return Optional.ofNullable(flightService.getSpecificFlight(flightName));
    }
    @PostMapping("/add-flight")
    public void addFlight(@RequestBody FlightEntity flight){
    flightService.addFlight(flight);
    }

    @GetMapping("/{id}")
    public Optional<FlightEntity> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }


    }

