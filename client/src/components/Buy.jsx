import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import './Buy.css';

const Buy = ({ state }) => {
  useEffect(() => {
    console.log("Contract state:", state.contract);
    if (state.contract) {
      console.log("Contract is available");
    } else {
      console.error("Contract is not available");
    }
  }, [state.contract]);

  const buyChai = async (event) => {
    event.preventDefault();

    const { contract } = state;
    if (!contract) {
      console.error("Contract instance is not available.");
      alert("Contract instance is not available.");
      return;
    }

    try {
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      const amount = { value: ethers.utils.parseEther("0.001") };

      console.log("Name:", name, "Message:", message); 
      console.log("Contract:", contract); 

      console.log("Initiating transaction...");
      const transaction = await contract.buychai(name, message, amount);
      console.log("Transaction details:", transaction);
      await transaction.wait();
      alert("Transaction is successful");
      window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="center">
      <h1>Thanks</h1>
      <form onSubmit={buyChai}>
        <div className="inputbox">
          <input type="text" required="required" id="name" />
          <span>Name</span>
        </div>
        <div className="inputbox">
          <input type="text" required="required" id="message" />
          <span>Message</span>
        </div>
        <div className="inputbox">
          <input type="submit" value="Pay" disabled={!state?.contract} />
        </div>
      </form>
    </div>
  );
};

export default Buy;
