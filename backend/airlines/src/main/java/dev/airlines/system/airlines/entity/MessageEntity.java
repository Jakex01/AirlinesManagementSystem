package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name="messages")
@Data
@NoArgsConstructor
public class MessageEntity {

    public MessageEntity(String title, String question) {
        this.title = title;
        this.question = question;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_email")
    private String user_email;
    @Column(name="title")
    private String title;
    @Column(name="question")
    private String question;
    @Column(name="admin_email")
    private String admin_email;
    @Column(name="response")
    private String response;
    @Column(name="closed")
    private boolean closed;
}
