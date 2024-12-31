import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ethers } from 'ethers'

export default function Dashboard({ contractData }) {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const lastVisited = new Date(contractData.lastVisited)
      const tenYearsFromLastVisit = new Date(lastVisited.getTime() + 10 * 365 * 24 * 60 * 60 * 1000)
      const diff = tenYearsFromLastVisit.getTime() - now.getTime()

      if (diff > 0) {
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24))
        setTimeRemaining(`${years} years, ${days} days`)
      } else {
        setTimeRemaining('Game Over!')
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [contractData.lastVisited])

  const pingActivity = () => {
    console.log('Pinging activity...')
  }

  const depositFunds = () => {
    console.log('Depositing funds...')
  }

  const claimFunds = () => {
    console.log('Claiming funds...')
  }

  return (
    <div className="py-12 px-6 bg-mario-blue">
      <div className="max-w-3xl mx-auto bg-mario-sky rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl mb-6 text-mario-red font-pixel-large">Player Stats</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-mario-yellow p-2 rounded">
            <p className="text-mario-blue font-pixel">Start Time:</p>
            <p className="text-mario-red font-pixel">{new Date(contractData.startTime).toLocaleString()}</p>
          </div>
          <div className="bg-mario-yellow p-2 rounded">
            <p className="text-mario-blue font-pixel">Last Activity:</p>
            <p className="text-mario-red font-pixel">{new Date(contractData.lastVisited).toLocaleString()}</p>
          </div>
          <div className="bg-mario-yellow p-2 rounded">
            <p className="text-mario-blue font-pixel">Time Remaining:</p>
            <p className="text-mario-red font-pixel">{timeRemaining}</p>
          </div>
          <div className="bg-mario-yellow p-2 rounded">
            <p className="text-mario-blue font-pixel">Recipient:</p>
            <p className="text-mario-red font-pixel">{contractData.recipientAddress}</p>
          </div>
          <div className="col-span-2 bg-mario-yellow p-2 rounded">
            <p className="text-mario-blue font-pixel">Balance:</p>
            <p className="text-mario-red text-2xl font-pixel">{ethers.utils.formatEther(contractData.balance)} ETH</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={pingActivity} className="retro-button bg-mario-green hover:bg-mario-green/80 font-pixel">Ping</Button>
          <Button onClick={depositFunds} className="retro-button bg-mario-yellow hover:bg-mario-yellow/80 font-pixel">Add Coins</Button>
          <Button onClick={claimFunds} disabled={timeRemaining !== 'Game Over!'} className="retro-button bg-mario-red hover:bg-mario-red/80 disabled:opacity-50 font-pixel">
            Claim Prize
          </Button>
        </div>
      </div>
    </div>
  )
}

