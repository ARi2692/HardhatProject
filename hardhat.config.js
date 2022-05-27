require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config(); //all the key value pairs are being made available due to this lib

 const {API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env; //environment variables are being loaded here.
 
 module.exports = {
   solidity: "0.8.10",
   defaultNetwork: 'rinkeby',
   networks: {
     hardhat: {},
     rinkeby: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
   },
   etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: ETHERSCAN_API_KEY
   }
 };

 