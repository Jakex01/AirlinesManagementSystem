package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.CheckoutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<CheckoutEntity, Long> {
    @Query(value = "SELECT * FROM checkout WHERE user_email = ?1 AND flight_id = ?2", nativeQuery = true)
    CheckoutEntity findByUser_emailAndFlight_id(String user_email, Long flight_id);

    @Query(value = "SELECT * FROM checkout WHERE user_email = ?1", nativeQuery = true)
    List<CheckoutEntity> findCheckoutEntitiesByUser_email(String user_email);

}
