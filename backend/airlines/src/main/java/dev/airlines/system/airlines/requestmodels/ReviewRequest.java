package dev.airlines.system.airlines.requestmodels;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Data
public class ReviewRequest {
    private double rating;
    private Long flight_id;
    private Optional<String> review_description;
}
