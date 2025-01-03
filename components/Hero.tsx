import { Button } from '@/components/ui/button';
import { FaRocket, FaQuestionCircle } from 'react-icons/fa';  // Import icons from react-icons

export default function Hero({ connectWallet }: any) {
  return (
    <div className="py-14 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pixel-bg"></div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Press_Start_2P'] text-[#ffbf00] leading-normal">
            Inherit assets
          </h1>
          <p className="font-['Press_Start_2P'] text-[#ff5733] text-sm md:text-base leading-relaxed">
            A decentralized way to ensure your assets are passed to your loved ones.
          </p>
          <div className="flex gap-x-6 justify-center">
            <Button
              onClick={connectWallet}
              className="bg-blue-600 text-white font-['Press_Start_2P'] text-sm px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transform hover:bg-blue-700 hover:scale-105 transition-transformm"
            >
              <FaRocket /> Get Started
            </Button>
            <Button
              onClick={connectWallet}  // Assuming this button might also connect a wallet or perform an action
              className="bg-green-700 text-white font-['Press_Start_2P'] text-sm px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transform hover:bg-green-600 hover:scale-105 transition-transform"
            >
              <FaQuestionCircle /> HOW it works?
            </Button>
          </div>
        </div>
        <div className="relative z-10 flex justify-center items-center">
          <img
            src="/images/hero.gif"
            alt="Pixelated figure dissolving"
            className="object-contain image-pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
}
