package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    @Query("SELECT r FROM ReviewEntity r WHERE r.flight_id = :flight_id")
    List<ReviewEntity> findByFlightId(@RequestParam("flight_id") Long flight_id);

    @Query("SELECT r FROM ReviewEntity r WHERE r.user_email = :user_email AND r.flight_id = :flight_id")
    ReviewEntity findByUserEmailAndFlightId(String user_email, Long flight_id);

}
