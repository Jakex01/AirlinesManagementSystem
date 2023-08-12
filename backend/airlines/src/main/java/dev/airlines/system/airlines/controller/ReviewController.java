package dev.airlines.system.airlines.controller;
import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.requestmodels.ReviewRequest;
import dev.airlines.system.airlines.service.ReviewService;
import dev.airlines.system.airlines.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {


    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/all")
    public List<ReviewEntity> findAllReviews(@RequestHeader(value="Authorization") String token){
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return reviewService.findAll();
    }

    @GetMapping("/secure/{id}")
    public List<ReviewEntity> findReviewByFlightId(@PathVariable Long id,
                                                   @RequestHeader(value="Authorization") String token) {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return reviewService.findReviewByFlightId(id);
    }
    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token,
                           @RequestBody ReviewRequest review) throws Exception {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");

        if(user_email == null){
            throw new Exception("User email is missing");
        }

        reviewService.postReview(user_email,review);
    }
    @GetMapping("/secure/user/flight/{id}")
    public Boolean reviewFlightByUser(@RequestHeader(value="Authorization") String token,
                                      @PathVariable Long id) throws Exception {

        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        if(user_email == null){
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(user_email,id);
    }


}

