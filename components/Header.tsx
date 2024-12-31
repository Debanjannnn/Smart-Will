import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  walletConnected: boolean;
  connectWallet: () => void;
}

export default function Header({ walletConnected, connectWallet }: HeaderProps) {
  return (
    <header className="bg-black py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl text-mario-yellow font-pixel-large" aria-label="Smart Will Home">
          Smart Will
        </Link>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link href="/create-will">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-pixel-sm py-2 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-xl">
              Create Will
            </Button>
          </Link>

          {!walletConnected && (
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white font-pixel-sm py-2 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-xl"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
