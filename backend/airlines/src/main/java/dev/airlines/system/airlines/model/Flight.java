package dev.airlines.system.airlines.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Flight {
    @Id
    private Long flight_id;
    private String departure_from;
    private String destination;
    private int seats_reserved_business;
    private int seats_reserved_economy;
    private int price_business;
    private int price_economy;
    private String  departure_date;
    private int flight_time;
    private double average_rating;
}
