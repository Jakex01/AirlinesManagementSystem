package dev.airlines.system.airlines.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Airplane {

    @Id
    private Long airplane_id;
    private String airplane_name;
    private int airplane_no_business_seats;
    private int airplane_no_economy_seats;

}
