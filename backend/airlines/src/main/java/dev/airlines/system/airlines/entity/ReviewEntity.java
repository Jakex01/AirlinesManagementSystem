package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Table(name="review")
public class ReviewEntity {

    @Id
    @Column(name="review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="user_email")
    private String user_email;
    @Column(name="review_description")
    private String review_description;
    @Column(name="revie_date")
    private Date review_date;
    @Column(name="flight_id")
    private Long flight_id;
    @Column(name="review_Rating")
    private double review_rating;
}
