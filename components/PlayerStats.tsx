interface PlayerStatsProps {
  name: string;
  beneficiary: string;
  assets: string;
}

export default function PlayerStats({ beneficiary, assets }: PlayerStatsProps) {
  // Helper function to truncate the Ethereum address
  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="pixel-box mt-8">
      <h2 className="text-2xl mb-4 text-mario-yellow">Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-mario-green">Beneficiary:</p>
          <p className="text-white">{truncateAddress(beneficiary)}</p>
        </div>
        <div>
          <p className="text-mario-green">Assets:</p>
          <p className="text-white">{assets}</p>
        </div>
      </div>
    </div>
  );
}
