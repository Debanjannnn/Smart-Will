'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Dashboard from '../components/Dashboard'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import ScrollToTopButton from '../components/ScrollToTopButton'

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [contractData, setContractData] = useState(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletConnected(true)
        setContractData({
          startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          lastVisited: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          recipientAddress: '0x1234...5678',
          balance: ethers.utils.parseEther('10').toString()
        })
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pixelated">
      <div className="pixel-bg"></div>
      <div className="relative z-10">
        <Header walletConnected={walletConnected} connectWallet={connectWallet} />
        <main>
          <Hero connectWallet={connectWallet} />
          <Features />
          {walletConnected && contractData && <Dashboard contractData={contractData} />}
          <HowItWorks />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  )
}

