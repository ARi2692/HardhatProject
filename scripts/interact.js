
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/carpool.sol/Carpool.json");

// console.log(JSON.stringify(contract.abi));


// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const carpoolContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
     
    const tx1 = await carpoolContract.createForCarpool("R", "S", 3, 10000, 1653288499);
    console.log("Creating a carpool...");
    await tx1.wait();

    const booking1 = await carpoolContract.bookings(2);
    console.log("The booking details are: " + booking1);

    const tx2 = await carpoolContract.makeBooking(2, 2, {value: 20000});
    console.log("booking a carpool...");
    await tx2.wait();

    const booking2 = await carpoolContract.bookings(2);
    console.log("The booking details are: " + booking2);

    const tx3 = await carpoolContract.startTheRide(2);
    console.log("starting the carpool...");
    await tx3.wait();

    const booking3 = await carpoolContract.bookings(2);
    console.log("The booking details are: " + booking3);

    const tx4 = await carpoolContract.endTheRIde(2);
    console.log("end the carpool...");
    await tx4.wait();

    const booking4 = await carpoolContract.bookings(2);
    console.log("The booking details are: " + booking4);
    
}

main();