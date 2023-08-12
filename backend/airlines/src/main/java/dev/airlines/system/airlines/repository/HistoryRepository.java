package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.HistoryEntity;
import org.hibernate.Internal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {

    //List<HistoryEntity> findByUser_email(@RequestParam("email") String user_email);


}
