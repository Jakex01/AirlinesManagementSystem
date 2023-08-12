package dev.airlines.system.airlines.service;

import dev.airlines.system.airlines.entity.MessageEntity;
import dev.airlines.system.airlines.repository.MessagesRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessagesService {

    private final MessagesRepository messagesRepository;


    public void postMessage(MessageEntity messageRequest, String user_email) {
        MessageEntity message = new MessageEntity(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUser_email(user_email);
        messagesRepository.save(message);

    }
    public List<MessageEntity> getMessages(String user_email){
        return messagesRepository.findMessageEntitiesByUser_email(user_email);
    }


}
