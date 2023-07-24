package dev.airlines.system.airlines.flight;

import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.repository.FlightRepository;
import org.checkerframework.common.value.qual.StringVal;
import org.junit.jupiter.api.Test;
import java.util.List;

import static org.assertj.core.api.ClassBasedNavigableIterableAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.util.AssertionErrors.assertEquals;

public class FlightRepositoryTest {

    private final FlightRepository flightRepo;

    public FlightRepositoryTest(FlightRepository flightRepo) {
        this.flightRepo = flightRepo;
    }

    @Test
    void TakeEachReviewConnectedToId(){

        FlightEntity flight = new FlightEntity();
        flight.setDeparture_from("City A");
        flight.setDestination("City B");
        flight.setNo_seats_reserved_business(10);
        flight.setNo_seats_reserved_economy(50);
        flight.setPrice_business(200);
        flight.setPrice_economy(100);
        flight.setDeparture_date("2023-07-18");
        flight.setFlight_time(120);
        flight.setAverage_rating(4.5);


        flightRepo.save(flight);

        List<FlightEntity> flight1 = flightRepo.findFlightByFlightName("City A", "City B","2023-07-18");

        int expectedSize = 1;
       
    }

}
