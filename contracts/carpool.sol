// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "./bookCarpool.sol";

contract Carpool is BookCarpool {

    // events once the carpool has started and ended
    event started(uint indexed);
    event ended(uint indexed);

    // 
    function startTheRide(uint carpoolingId) external {

        // create a instance of carbook in memory for a particular ID
        // loading the carpool details with new ID in the memory to further reference in the function
        Booking memory carbook = bookings[carpoolingId];
        require(carbook.startTime <= block.timestamp, "Please wait for the ride to start");
        require(carbook.owner == msg.sender, "you are not the owner");
        require(carbook.carpoolingState != State.started, "already started");
        require(carbook.carpoolingState != State.ended, "already ended");

        // update the carpooling state to started
        bookings[carpoolingId].carpoolingState = State.started;

        // event emitted once the ride started
        emit started(carpoolingId);
    }

    function endTheRIde(uint carpoolingId) external {

        // loading the carpool details with new ID in the memory to further reference in the function 
        Booking memory carbook = bookings[carpoolingId];
        require(carbook.owner == msg.sender, "you are not the owner");
        require(carbook.carpoolingState != State.ended, "already ended");
        require(carbook.carpoolingState == State.started, "not yet started");

        // update the state of carpool to ended
        bookings[carpoolingId].carpoolingState = State.ended;

        // get paid for car pooling, 
        // dev - to avoid reenterency used an intermidiate variable
        uint bookamount = bookings[carpoolingId].amountBooked;
        bookings[carpoolingId].amountBooked = 0;
        bookings[carpoolingId].owner.transfer(bookamount);

        emit ended(carpoolingId);
    }
}