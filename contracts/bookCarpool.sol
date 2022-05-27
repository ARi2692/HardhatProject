// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./createCarpool.sol";

contract BookCarpool is CreateCarpool {

    //  event when a booking is done
    event BookingDone(uint indexed carpoolingId, address indexed booker, uint8 nSeatBooked, uint256 amountBooked);

    // passenger booked N Seats
    function makeBooking(uint carpoolingId, uint8 nSeatBook) payable public carpoolState(carpoolingId, State.available) {
        
        // loading the carpool details with new ID in the memory to further reference in the function
        Booking memory carbook = bookings[carpoolingId];

        // check for available seats and the amount paid of the carpool
        require(nSeatBook > 0, "Book at least 1 Seat");
        require(nSeatBook <= carbook.nSeatAvailable, "Not enough Seat available!");
        require((carbook.price * nSeatBook) == msg.value, "Pay the right price !");

        // update the number of seats available for this carpool
        bookings[carpoolingId].nSeatAvailable -= nSeatBook;

        // check if seats are not available change the state to all seats booked 
        if (bookings[carpoolingId].nSeatAvailable == 0) {
            bookings[carpoolingId].carpoolingState = State.booked;
        }

        // update the amount paid by the user for this carpool which will be paid to the owner of carpool once the ride starts
        bookings[carpoolingId].amountBooked += msg.value;

        // An event will be emitted once the booking is successfully completed
        emit BookingDone(carpoolingId, msg.sender, nSeatBook, msg.value);
    }
}