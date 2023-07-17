package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Table(name="flight")
@Getter
@Setter
public class FlightEntity {
    @Id
    @Column(name="flight_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="departure_from")
    private String departure_from;
    @Column(name="destination")
    private String destination;
    @Column(name="no_seats_reserved_business")
    private int no_seats_reserved_business;
    @Column(name="no_seats_reserved_economy")
    private int no_seats_reserved_economy;
    @Column(name="price_business")
    private int price_business;
    @Column(name="price_economy")
    private int price_economy;
    @Column(name="departure_date")
    private String  departure_date;
    @Column(name="flight_time")
    private int flight_time;
    @Column(name="average_rating")
    private double average_rating;
    @ManyToOne
    @JoinColumn(name="airplane_id")
    private AirplaneEntity airplane;
    @OneToMany(mappedBy="flight")
    private List<ReviewEntity> review;
    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;
}
