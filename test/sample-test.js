const { expect } = require("chai");

describe("Carpool", function () {
    
  it("Should create a carpool", async function () {
    const Carpool = await ethers.getContractFactory("Carpool");
    const carpool = await Carpool.deploy();
    await carpool.deployed();

    const createForCarpoolTx = await carpool.createForCarpool("A", "B", 8, 10000, 1653288440);
    // wait until the transaction is mined
    await createForCarpoolTx.wait();

    const book = await carpool.bookings(1);

    expect(book[0]).to.equal('0x341d7eb69809B5035FC3F0fDd11b55372549D449');
    expect(book[1]).to.equal(8);
    expect(book[2]).to.equal(8);
    expect(book[3]).to.equal(0);
    expect(book[4]).to.equal(10000);
    expect(book[5]).to.equal(1653288440);
    expect(book[6]).to.equal(1);

  });

  // it("Should book a carpool", async function () {

  //   const BookCarpoolTx = await carpool.makeBooking(1, 2, {value: 20000});
  //   // wait until the transaction is mined
  //   await BookCarpoolTx.wait();

  //   const book1 = await carpool.bookings(1);
  //   expect(book1[2]).to.equal(6);
  //   expect(book1[3]).to.equal(20000);

  // });

  // it("Should start a carpool", async function () {
  //   const startTheRideTx = await carpool.startTheRide(1);
  //   // wait until the transaction is mined
  //   await startTheRideTx.wait();

  // const book = await carpool.bookings(1);
  // expect(book[6]).to.equal(3);

  //   expect(await carpool.bookings(1)).to.equal(0x341d7eb69809B5035FC3F0fDd11b55372549D449, 3, 1, 20000, 10000, 1653288440, 3);
  // });

  // it("Should end a carpool", async function () {
  //   const endTheRIdeTx = await carpool.endTheRIde(1);
  //   // wait until the transaction is mined
  //   await endTheRIdeTx.wait();

  // const book = await carpool.bookings(1);
  // expect(book[6]).to.equal(4);

  //   expect(await carpool.bookings(1)).to.equal(0x341d7eb69809B5035FC3F0fDd11b55372549D449, 3, 1, 20000, 10000, 1653288440, 4);  
  // });
});

// can use this for  timeout error - "mocha --timeout 500000" instead "echo \"Error: no test specified\" && exit 1"
