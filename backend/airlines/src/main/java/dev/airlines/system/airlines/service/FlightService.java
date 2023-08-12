package dev.airlines.system.airlines.service;
import dev.airlines.system.airlines.entity.CheckoutEntity;
import dev.airlines.system.airlines.entity.FlightEntity;
import dev.airlines.system.airlines.repository.CheckoutRepository;
import dev.airlines.system.airlines.repository.FlightRepository;
import dev.airlines.system.airlines.repository.HistoryRepository;
import dev.airlines.system.airlines.responsemodels.Bookings;
import dev.airlines.system.airlines.responsemodels.ShelfCurrentBookingsResponse;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.ToString;

import org.springframework.stereotype.Service;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class FlightService {

    private final FlightRepository flightRepository;
    private final CheckoutRepository checkoutRepository;
    private final HistoryRepository historyRepository;



    public List<FlightEntity> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<FlightEntity> getSpecificFlight(FlightEntity flightName) {

       // return flightRepository.findFlightByFlightName(flightName.getDeparture_from(), flightName.getDestination(), flightName.getDeparture_date());

        return flightRepository.findAll()
                .stream()
                .filter(flight -> flight.getDeparture_from().equals(flightName.getDeparture_from()))
                .filter(flight -> flight.getDestination().equals(flightName.getDestination()))
                .filter(flight ->flight.getDeparture_date().equals(flightName.getDeparture_date()))
                .collect(Collectors.toList());
    }


    public void addFlight(FlightEntity flight) {
        flightRepository.save(flight);
    }


    public List<FlightEntity> findByDepartureFrom(String departureFrom) {
        return flightRepository.findByDepartureFromContaining(departureFrom);
    }

    public Optional<FlightEntity> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public FlightEntity checkoutFlight(String user_email, Long flightId) throws Exception {
        Optional<FlightEntity> flight = flightRepository.findById(flightId);
        CheckoutEntity validCheckout = checkoutRepository.findByUser_emailAndFlight_id(user_email, flightId);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String strDate = formatter.format(date);

        if (flight.isEmpty() || validCheckout != null /*||flight.get().getNo_seats_reserved_business() >= 0 || flight.get().getNo_seats_reserved_economy() > 0*/) {
            throw new Exception("Flight doesn't exist" + flightId);
        }

        flight.get().setNo_seats_reserved_economy(flight.get().getNo_seats_reserved_economy() + 1);
        flightRepository.save(flight.get());

        CheckoutEntity checkout = new CheckoutEntity(
                user_email,
                flight.get().getId(),
                strDate
        );

        checkoutRepository.save(checkout);

        return flight.get();
    }

    public Boolean checkoutFlightByUser(String user_email, Long flightId){
        CheckoutEntity validCheckout = checkoutRepository.findByUser_emailAndFlight_id(user_email, flightId);

        return validCheckout != null;
    }

    public int currentLoansCount(String user_email) {
        return checkoutRepository.findCheckoutEntitiesByUser_email(user_email).size();
    }

    public int currentBookedSeats(String user_email) {
            return checkoutRepository.findCheckoutEntitiesByUser_email(user_email).size();
    }

    public List<ShelfCurrentBookingsResponse> currentBookings(String user_email){
        List<ShelfCurrentBookingsResponse> shelfCurrentBookingsResponses = new ArrayList<>();



        List<CheckoutEntity> checkoutEntities = checkoutRepository.findCheckoutEntitiesByUser_email(user_email);
        List<Long> flightIds = new ArrayList<>();

        checkoutEntities.forEach(checkoutEntity -> flightIds.add(checkoutEntity.getFlight_id()));

        List<FlightEntity> flight = flightRepository.findFlightsByFlightIds(flightIds);


        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        LocalDate today = LocalDate.parse(formatter.format(new Date()));




        for(FlightEntity flightEntity :flight){
            Optional<CheckoutEntity> checkout = checkoutEntities.stream()
                    .filter(checkoutEntity -> checkoutEntity.getFlight_id().equals(flightEntity.getId()))
                    .findFirst();
            LocalDate flightDate = LocalDate.parse(flightEntity.getDeparture_date());

            if(today.isBefore(flightDate)){
                shelfCurrentBookingsResponses.add(new ShelfCurrentBookingsResponse(flightEntity, checkout.get().getBooking_date(), "Current"));
            }else{
                shelfCurrentBookingsResponses.add(new ShelfCurrentBookingsResponse(flightEntity, checkout.get().getBooking_date(), "history"));
            }

        }



        return shelfCurrentBookingsResponses;
    }




    public void returnFlightSeat(String user_email, Long flight_id) throws Exception{
        Optional<FlightEntity> flight = flightRepository.findById(flight_id);
        CheckoutEntity validCheckout = checkoutRepository.findByUser_emailAndFlight_id(user_email, flight_id);


        if(flight.isEmpty() || validCheckout == null){
            throw new Exception("Flight doesn't exist or not checked out by user yet" + flight_id);
        }

        if(validCheckout.getBooking_date().compareTo(new Date().toString()) < 0){
            throw new Exception("Flight has already departed" + flight_id);
        }

        flight.get().setNo_seats_reserved_economy(flight.get().getNo_seats_reserved_economy() - 1);
        flightRepository.save(flight.get());


        checkoutRepository.deleteById(validCheckout.getId());


    }


}
