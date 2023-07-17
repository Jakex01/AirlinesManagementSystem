package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
