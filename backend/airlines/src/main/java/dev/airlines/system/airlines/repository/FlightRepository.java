package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.entity.ReviewEntity;
import dev.airlines.system.airlines.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
@EnableJpaRepositories(basePackages = "dev.airlines.system.airlines.entity.FlightEntity")
public interface FlightRepository extends JpaRepository<FlightEntity, Long>{
    @Query("SELECT f.review FROM FlightEntity f " +
            "WHERE f.departure_from = :departure " +
            "AND f.destination = :destination " +
            "AND f.departure_date = :departure_date")
    List<ReviewEntity> findReviewIds(String departureFrom, String destination, String departureDate);

/*
    @Query("SELECT f FROM FlightEntity f " +
            "WHERE f.departure_from = :departure " +
           "AND f.destination = :destination " +
            "AND f.departure_date = :departure_date")
    List<FlightEntity> findFlightByFlightName(@RequestParam("departure") String departure,
                                             @RequestParam("destination") String destination,
                                             @RequestParam("departure_date") String departureDate);
*/

}
