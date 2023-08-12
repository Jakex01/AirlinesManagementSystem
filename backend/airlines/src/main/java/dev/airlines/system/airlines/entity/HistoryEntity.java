package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="history")
@NoArgsConstructor
@Data
public class HistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_email")
    String user_email;
    @Column(name="booking_date")
    String booking_date;
    @Column(name="departure_from")
    String departure_from;
    @Column(name="destination")
    String destination;
    @Column(name="flight_time")
    Integer flight_time;
    @Column(name="price")
    Integer price;


    public HistoryEntity(String user_email, String booking_date,
                         String departure_from, String destination,
                        Integer flight_time, Integer price) {
        this.user_email = user_email;
        this.booking_date = booking_date;
        this.departure_from = departure_from;
        this.destination = destination;
        this.flight_time = flight_time;
        this.price = price;

    }

}
