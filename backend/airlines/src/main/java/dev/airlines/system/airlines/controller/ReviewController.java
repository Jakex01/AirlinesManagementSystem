package dev.airlines.system.airlines.controller;
import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {


    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }



    @GetMapping("/flight-review")
    public Optional<List<ReviewEntity>> flightsReview(@RequestBody FlightEntity flight) {
        return Optional.ofNullable(reviewService.getFlightReviews(flight));
    }




}
