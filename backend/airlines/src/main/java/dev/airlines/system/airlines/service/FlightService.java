package dev.airlines.system.airlines.service;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.repository.FlightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class FlightService {

    private final FlightRepository flightRepository;


    public List<FlightEntity> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<FlightEntity> getSpecificFlight(FlightEntity flightName) {

       // return flightRepository.findFlightByFlightName(flightName.getDeparture_from(), flightName.getDestination(), flightName.getDeparture_date());

        return flightRepository.findAll()
                .stream()
                .filter(flight -> flight.getDeparture_from().equals(flightName.getDeparture_from()))
                .filter(flight -> flight.getDestination().equals(flightName.getDestination()))
                .filter(flight ->flight.getDeparture_date().equals(flightName.getDeparture_date()))
                .collect(Collectors.toList());
    }



}
