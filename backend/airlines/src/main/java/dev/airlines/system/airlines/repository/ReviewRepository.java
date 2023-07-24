package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
}
