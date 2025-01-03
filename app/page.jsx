'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Dashboard from '../components/Dashboard'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import { useSmartWill } from '@/context/SmartWillContext' // Import the context hook
import BalanceDisplay from '../components/BalanceDisplay';
export default function Home() {
  const [contractData, setContractData] = useState(null)


  const {
    account,
    connectWallet,
    getContractBalance
  } = useSmartWill() // Access context values
  const [balance, setBalance] = useState(0)

  const handleConnectWallet = async () => {
    const balance = await getContractBalance();
    setBalance(balance);
    await connectWallet() // Use connectWallet function from context
    // Optionally, you can add logic to load contract data once wallet is connected
    if (account) {
      setContractData({
        startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        lastVisited: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        recipientAddress: '0x1234...5678',
        balance: ethers.utils.parseEther('10').toString()
      })
    }
  }



  return (
    <div className="min-h-screen bg-black text-white pixelated">
      <div className="pixel-bg"></div>
      <div className="relative z-10">
        <Header
          walletConnected={!!account}  // Show connection status
          connectWallet={handleConnectWallet}
          account={account} // Pass the wallet address to Header
        />

        <main className=''>

          <Hero connectWallet={handleConnectWallet} />
          <Features />
          {account && contractData && <Dashboard contractData={contractData} />}
          <BalanceDisplay balance={balance} />
          <HowItWorks />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  )
}
