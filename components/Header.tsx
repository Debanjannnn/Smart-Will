"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Gamepad2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSmartWill } from "@/context/SmartWillContext";

interface HeaderProps {
  walletConnected: boolean
  connectWallet: () => void
  account: string | null
}

export default function Header({ walletConnected, connectWallet, account }: HeaderProps) {
  const [createdWill, setCreatedWill] = useState(false);

  const { hasCreatedWill } = useSmartWill();
  useEffect(() => {
    if (account) {
      const checkWill = async () => {
        const result = await hasCreatedWill();
        setCreatedWill(result);
      };
      checkWill();
    }
  }, [account, hasCreatedWill]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Smart Will Home"
        >
          <Gamepad2 className="w-8 h-8 text-yellow-400 animate-pulse group-hover:animate-bounce" />
          <span className="text-2xl font-pixel-large bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text
            hover:from-yellow-400 hover:via-yellow-600 hover:to-yellow-800 transition-all duration-300">
            Smart Will
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 space-x-4 sm:space-x-2">
          {/* Conditionally render Create Will */}
          {!createdWill && (
            <Link href="/create-will">
              <Button
                className="relative font-pixel-sm bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
                text-white border border-blue-400/30 rounded-xl px-6 py-3 md:px-5 md:py-4
                shadow-[0_0_15px_rgba(59,130,246,0.5)] 
                transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]
                hover:scale-105 
                active:scale-95
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300
                overflow-hidden"
              >
                Create Will
              </Button>
            </Link>
          )}

          {/* Conditionally render Check My Will */}
          {createdWill && (
            <Link href="/check-my-will">
              <Button
                className="relative font-pixel-sm bg-gradient-to-r from-green-600 via-green-700 to-green-800 
                text-white border border-green-400/30 rounded-xl px-6 py-3 md:px-5 md:py-4
                shadow-[0_0_15px_rgba(16,185,129,0.5)] 
                transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]
                hover:scale-105 
                active:scale-95"
              >
                Check My Will
              </Button>
            </Link>
          )}

          {!walletConnected ? (
            <Button
              onClick={connectWallet}
              className="relative font-pixel-sm bg-gradient-to-r from-red-600 via-red-700 to-red-800 
              text-white border border-red-400/30 rounded-xl px-6 py-3 md:px-5 md:py-4
              shadow-[0_0_15px_rgba(239,68,68,0.5)] 
              transition-all duration-300 
              hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]
              hover:scale-105 
              active:scale-95
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
              before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300
              overflow-hidden"
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="relative group">
              <div className="font-pixel-sm bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 
                text-white border border-emerald-400/30 rounded-xl px-6 py-3 md:px-5 md:py-4
                shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <span className="relative z-10">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
