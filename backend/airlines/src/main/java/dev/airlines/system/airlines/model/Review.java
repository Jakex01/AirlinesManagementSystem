package dev.airlines.system.airlines.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    private long id;
    private String user_email;
    private String review_description;
    private Date review_date;
    private Long flight_id;
    private double review_rating;

}
