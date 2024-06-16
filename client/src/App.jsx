import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import abi from "./contract.json/chai.json";
import './App.css';
import Buy from './components/Buy';
import Memos from './components/Memos';
import chaiImage from './assets/Images/chai.png'; 

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      try {
        const contractAddress = "0xE340626E30159e68e1d35A3ddb3C8bcc0911eeDb"; // Fill in your contract address
        const contractABI = abi.abi; // Fill in your contract ABI

        if (window.ethereum) {
          const ethereum = window.ethereum;

          try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Accounts:", accounts);
            setAccount(accounts[0]);

            // Listen for account changes
            window.ethereum.on("accountsChanged", (accounts) => {
              console.log("Accounts changed:", accounts);
              setAccount(accounts[0]);
              window.location.reload();
            });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            setState({ provider, signer, contract });
          } catch (requestError) {
            console.error("Error requesting account access: ", requestError);
            setError("Error requesting account access.");
          }
        } else {
          console.error("MetaMask is not installed.");
          setError("MetaMask is not installed. Please install MetaMask to use this application.");
        }
      } catch (initError) {
        console.error("Error initializing contract: ", initError);
        setError("Error initializing contract.");
      } finally {
        setLoading(false);
      }
    };

    initContract();
  }, []);

  return (
    <div>
      <img src={chaiImage} alt="Chai" style={{ width: '100%', height: '60vh', display: 'block' }} /> {/* Displaying the image at the top */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p style={{ marginTop: "10px", marginLeft: "5px" }}>
            <small>Connected Account - {account}</small>
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Buy state={state}></Buy>
          <Memos state={state}></Memos>
        </>
      )}
    </div>
  );
}

export default App;
