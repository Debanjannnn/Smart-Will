interface PlayerStatsProps {
  name: string;
  beneficiary: string;
  assets: string;
}

export default function PlayerStats({ beneficiary, assets }: PlayerStatsProps) {
  return (
    <div className="pixel-box mt-8">
      <h2 className="text-2xl mb-4 text-mario-yellow">Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-mario-green">Beneficiary:</p>
          <p className="text-white">{beneficiary}</p>
        </div>
        <div>
          <p className="text-mario-green">Assets:</p>
          <p className="text-white">{assets}</p>
        </div>
      </div>
    </div>
  )
}

