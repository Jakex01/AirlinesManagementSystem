package dev.airlines.system.airlines.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    private long id;
    private String review_body;
    private int review_rating;
    private User user;
    private Flight flight;

}
