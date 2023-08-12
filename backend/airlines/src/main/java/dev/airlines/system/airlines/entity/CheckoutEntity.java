package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="checkout")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_email")
    private String user_email;
    @Column(name="flight_id")
    private Long flight_id;
    @Column(name="booking_date")
    private String booking_date;

    public CheckoutEntity(String user_email, Long flight_id, String booking_date) throws Exception{
        this.user_email = user_email;
        this.flight_id = flight_id;
        this.booking_date = booking_date;
    }

}
