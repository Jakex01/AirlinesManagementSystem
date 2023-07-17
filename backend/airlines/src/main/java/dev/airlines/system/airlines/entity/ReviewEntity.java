package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name="review")
@Getter
@Setter
public class ReviewEntity {

    @Id
    @Column(name="review_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="review_body")
    private String review_body;
    @Column(name="review_Rating")
    private int review_rating;
    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;
     @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightEntity flight;


}
