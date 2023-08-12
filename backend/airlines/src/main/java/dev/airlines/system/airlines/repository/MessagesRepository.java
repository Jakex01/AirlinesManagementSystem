package dev.airlines.system.airlines.repository;

import dev.airlines.system.airlines.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface MessagesRepository extends JpaRepository<MessageEntity, Long> {

    @Query(value="SELECT * FROM messages WHERE user_email =?1", nativeQuery = true)
    public List<MessageEntity> findMessageEntitiesByUser_email(@RequestParam("user_email")String user_email);

}