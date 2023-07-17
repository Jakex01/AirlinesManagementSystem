package dev.airlines.system.airlines.service;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.model.Review;
import dev.airlines.system.airlines.repository.FlightRepository;
import dev.airlines.system.airlines.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FlightRepository flightRepository;

    public List<ReviewEntity> getFlightReviews(FlightEntity flight) {
     return flightRepository.findReviewIds(flight.getDeparture_from(), flight.getDestination(), flight.getDeparture_date());
    }
}
