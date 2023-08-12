package dev.airlines.system.airlines.controller;

import dev.airlines.system.airlines.entity.MessageEntity;
import dev.airlines.system.airlines.service.MessagesService;
import dev.airlines.system.airlines.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessagesController {

    private final MessagesService messagesService;


    @PostMapping("/secure/add/message")
    private void postMessage(@RequestHeader(value="Authorization") String token,
                             @RequestBody MessageEntity messageEntity) {
        String user_email = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");

        messagesService.postMessage(messageEntity, user_email);

    }
    @GetMapping("/secure/show-user/messages/{user_email}")
    private List<MessageEntity> getMessages(@PathVariable("user_email")String user_email){
        return messagesService.getMessages(user_email);
    }

}
