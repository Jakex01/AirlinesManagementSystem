package dev.airlines.system.airlines.service;

import dev.airlines.system.airlines.controller.FlightController;
import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.model.Review;
import dev.airlines.system.airlines.repository.FlightRepository;
import dev.airlines.system.airlines.repository.ReviewRepository;
import dev.airlines.system.airlines.requestmodels.ReviewRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ReviewService {


    private final ReviewRepository reviewRepository;


    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;

    }

    public List<ReviewEntity> findAll(){
        return reviewRepository.findAll();
    }

    public List<ReviewEntity> findReviewByFlightId(Long flight_id){
        return reviewRepository.findByFlightId(flight_id);
    }

    public void postReview(String user_email, ReviewRequest reviewRequest) throws
            IllegalStateException{
        ReviewEntity validateReview = reviewRepository.findByUserEmailAndFlightId(user_email, reviewRequest.getFlight_id());

        if (validateReview != null) {
            throw new IllegalStateException("You have already reviewed this flight");
        }

        Date currentDate = Calendar.getInstance().getTime();
        ReviewEntity review = new ReviewEntity();


        review.setFlight_id(reviewRequest.getFlight_id());
        review.setReview_rating(reviewRequest.getRating());
        review.setUser_email(user_email);
        review.setReview_date(currentDate);

        if (reviewRequest.getReview_description().isPresent()) {
            review.setReview_description(reviewRequest.getReview_description().map(Object::toString).orElse(null));
        }
        System.out.println(review);
        reviewRepository.save(review);
    }

        public Boolean userReviewListed(String user_email, Long flight_id){

            return reviewRepository
                    .findByUserEmailAndFlightId(user_email, flight_id) != null;
        }

}
