// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  // 
  const CreateCarpool = await hre.ethers.getContractFactory("CreateCarpool");
  const createCarpool = await CreateCarpool.deploy();
  await createCarpool.deployed();
  console.log("createCarpool deployed to:", createCarpool.address);

  const BookCarpool = await hre.ethers.getContractFactory("BookCarpool");
  const bookCarpool = await BookCarpool.deploy();
  await bookCarpool.deployed();
  console.log("bookCarpool deployed to:", bookCarpool.address);

  const Carpool = await hre.ethers.getContractFactory("Carpool");
  const carpool = await Carpool.deploy();
  await carpool.deployed();
  console.log("carpool deployed to:", carpool.address);

  // const [deployer] = await ethers.getSigners();
  // console.log('Deploying contracts with the account: ' + deployer.address);

  // // Deploy First
  //   const First = await ethers.getContractFactory('FirstContract');
  //   const first = await First.deploy();

  // // Deploy Second
  //   const Second = await ethers.getContractFactory('SecondContract');
  //   const second = await Second.deploy(first.address);

  //  console.log( "First: " + first.address );
  //  console.log( "Second: " + second.address ); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
