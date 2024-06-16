const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChaiModule", (m) => {
  // Specify the contract to deploy
  const chaiContract = m.contract("chai");

  // Return the deployed contract instance
  return { chaiContract };
});
