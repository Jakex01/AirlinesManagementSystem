package dev.airlines.system.airlines.flight;

import dev.airlines.system.airlines.repository.FlightRepository;
import dev.airlines.system.airlines.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class FlightServiceTest {


    @Mock
    FlightRepository repository;

    @InjectMocks
    FlightService flightService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }





}
