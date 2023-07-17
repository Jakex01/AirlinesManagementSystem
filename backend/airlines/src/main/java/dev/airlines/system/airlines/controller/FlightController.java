package dev.airlines.system.airlines.controller;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.service.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
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
    @GetMapping("/specific-flight")
    public Optional<List<FlightEntity>> getSpecificFlight(@RequestBody  FlightEntity flightName) {
        return Optional.ofNullable(flightService.getSpecificFlight(flightName));
    }

    }

