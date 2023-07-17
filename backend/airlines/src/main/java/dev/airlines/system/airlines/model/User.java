package dev.airlines.system.airlines.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private long id;
    private String email;
    private String password;
    private String name;
    private int flight_id;

}
