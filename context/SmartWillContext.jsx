"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils";
import CONTRACT_ABI from "@/abi";

const SmartWillContext = createContext();

export function SmartWillProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ovider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [willData, setWillData] = useState(null);
  const [allWills, setAllWills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize provider and contract
  useEffect(() => {}, []);

  // Connect to MetaMask and retrieve account info
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const providerInstance = new ethers.BrowserProvider(window.ethereum);

        const accounts = await providerInstance.send("eth_requestAccounts", []);
        const balance = await providerInstance.getBalance(accounts[0]);

        setAccount(accounts[0]);

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
        setError("Error connecting to wallet.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is required to use this app.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  }

  async function getContractBalance() {
    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create a contract instance with the signer
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      console.log(contract);

      const balance = await contract.getBalance();
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error fetching contract balance: ", error);
      setError("Error fetching contract balance.");
    } finally {
      setLoading(false);
    }
  }

  async function createWill(recipientAddress, description, amount) {
    try {
      setLoading(true);
      console.log(account)
  
      // Check if the user is connected
      if (!isConnected) {
        alert("Please connect your wallet first.");
        return;
      }
  
      // Ensure that description is at least 50 characters
      if (description.length < 50) {
        alert("Description must be at least 50 characters long.");
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      // Create a contract instance with the signer
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      console.log(contract)
  
      // Call the createWill function on the smart contract
      const tx = await contract.createWill(recipientAddress, description, {
        value: ethers.parseEther(amount), 
      });
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      // Successfully created the will
      alert("Will created successfully!");
      console.log(tx);
  
    } catch (error) {
      console.error("Error creating will: ", error);
      alert("Error creating the will. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function hasCreatedWill() {
    try {
      if (!account) {
        return false; // If no account is connected
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      const result = await contract.hasCreatedWill(account); // Call hasCreatedWill for the current account
      return result; // It will return true or false based on whether the will exists
    } catch (error) {
      console.error("Error checking if will exists:", error);
      return false; // If an error occurs, assume the will doesn't exist
    }
  }

  const getWillDetails = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // Replace this with the actual smart contract call
      const willDetails = await contract.getWillDetails(address);
      console.log(willDetails)
      return willDetails;
    } catch (error) {
      throw new Error('Failed to fetch will details');
    }
  };
  
  

  const value = {
    connectWallet,
    account,
    isConnected,
    getContractBalance,
    createWill, hasCreatedWill, getWillDetails
  };

  return (
    <SmartWillContext.Provider value={value}>
      {children}
    </SmartWillContext.Provider>
  );
}

export const useSmartWill = () => {
  const context = useContext(SmartWillContext);
  if (!context) {
    throw new Error("useSmartWill must be used within a SmartWillProvider");
  }
  return context;
};
