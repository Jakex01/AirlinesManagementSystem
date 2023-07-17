package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name="airplane")
@Getter
@Setter
public class AirplaneEntity {

    @Id
    @Column(name="airplane_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="airplane_name")
    private String airplane_name;
    @Column(name="airplane_no_business_seats")
    private int airplane_no_business_seats;
    @Column(name="airplane_no_economy_seats")
    private int airplane_no_economy_seats;

}
