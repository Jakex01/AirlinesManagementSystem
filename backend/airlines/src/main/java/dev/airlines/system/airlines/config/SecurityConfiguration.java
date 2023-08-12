package dev.airlines.system.airlines.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{



        // Configure our routes, later on i have to remove stars and add specific routes
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(configurer->
                configurer
                        .requestMatchers("/api/v1/flights/secure/**").authenticated()
                        .requestMatchers("/api/v1/reviews/secure/**").authenticated()
                        .requestMatchers("/api/v1/messages/secure/**").authenticated()
                )
                .oauth2ResourceServer(oauth2->oauth2
                        .jwt(jwt->jwt
                                .jwtAuthenticationConverter(new JwtAuthenticationConverter()
                                )
                        )
                );

        http.cors();

        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        //Okta.configureResourceServer401ResponseBody(http);
        System.out.println("tujestem");
        //Security configuration is using the builder pattern
        return http.build();
    }

}
