package dev.airlines.system.airlines.repository;
import dev.airlines.system.airlines.entity.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
@EnableJpaRepositories(basePackages = "dev.airlines.system.airlines.entity.FlightEntity")
public interface FlightRepository extends JpaRepository<FlightEntity, Long> {

    @Query("SELECT f FROM FlightEntity f WHERE f.departure_from LIKE %:departure_from%")
    List<FlightEntity> findByDepartureFromContaining(@Param("departure_from") String departure_from);
}

