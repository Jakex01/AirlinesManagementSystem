package dev.airlines.system.airlines.service;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.model.Review;
import dev.airlines.system.airlines.repository.FlightRepository;
import dev.airlines.system.airlines.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ReviewService {

    public ReviewService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    private final FlightRepository flightRepository;

    public FlightEntity flight(){
        return flightRepository.save(new FlightEntity());
    }

}
