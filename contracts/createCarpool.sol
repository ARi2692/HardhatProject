// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract CreateCarpool {

    // error in carpooling state
    error carpoolingStateError(uint _carpoolingId ,State _carpoolingState);

    // event will be created when a new carpool is created with the details of ID, origin, destination and start time.
    event newCarpool(uint, string, string, uint);

    // carpooling description
    uint[] carpoolingIds;    
    enum State{notStarted, available, booked, started, ended}

    struct Booking{
        address payable owner;
        uint8  nSeat;
        uint8 nSeatAvailable;
        uint256 amountBooked;
        uint256 price;
        uint256 startTime;
        State carpoolingState;
    }

    mapping(uint => Booking) public bookings;

    modifier carpoolState(uint _carpoolingId, State _state) {
        if(bookings[_carpoolingId].carpoolingState != _state) {
            revert carpoolingStateError(_carpoolingId, bookings[_carpoolingId].carpoolingState);
        }
        _;
    }

    function createForCarpool(
        string calldata _origin, 
        string calldata _destination, 
        uint8 _nSeat, 
        uint256 _price, 
        uint _startTime) public carpoolState(carpoolingIds.length +  1, State.notStarted) {

        // loading the carpool details with new ID in the memory to further reference in the function
        uint carpoolingId = carpoolingIds.length +  1;
        carpoolingIds.push(carpoolingId);
        Booking memory cardetail = bookings[carpoolingId];

        // creating new carpool with initial values for booking
        cardetail.owner = payable(msg.sender);
        cardetail.nSeat = _nSeat;
        cardetail.nSeatAvailable = _nSeat;
        cardetail.amountBooked = 0;
        cardetail.price = _price;
        cardetail.startTime = _startTime;
        cardetail.carpoolingState = State.available;

        bookings[carpoolingId] = cardetail;

        // event is emitted once a new carpool is created
        emit newCarpool(carpoolingId, _origin, _destination, _startTime);
    }
}