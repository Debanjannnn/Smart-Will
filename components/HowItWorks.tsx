export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      description: "Insert coin to start your Smart Will game.",
    },
    {
      number: 2,
      description: "Keep playing by pinging the contract regularly.",
    },
    {
      number: 3,
      description: "If inactive for 10 years, player 2 can claim the jackpot!",
    },
  ];

  return (
    <div className="py-12 px-6 bg-mario-green">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center mb-8 text-mario-red font-pixel-large">How It Works</h2>
        <div className="flex justify-center space-x-6">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 bg-mario-yellow p-6 rounded-lg shadow-lg">
              <div className="w-8 h-8 bg-mario-red text-white flex items-center justify-center font-bold rounded-full mb-4">
                {step.number}
              </div>
              <p className="text-mario-blue font-pixel">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
