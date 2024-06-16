require("dotenv").config();
const { string } = require("hardhat/internal/core/params/argumentTypes");

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    SepoliaETH: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
//0xE340626E30159e68e1d35A3ddb3C8bcc0911eeDb
