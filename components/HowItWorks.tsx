const steps = [
  {
    number: 1,
    name: "Step 1", // You should add a name or title for each step
    description: "Create your Smart Will by depositing funds and specifying a recipient.",
    color: '', // Add color here
    icon: "📝" // Add an icon if necessary
  },
  {
    number: 2,
    name: "Step 2", // Add a name or title for each step
    description: "Stay active by regularly pinging the contract to keep your will secure.",
    color: '', // Add color here
    icon: "🔒" // Add an icon if necessary
  },
  {
    number: 3,
    name: "Step 3", // Add a name or title for each step
    description: "After 10 years of inactivity, the recipient can claim the stored funds.",
    color: '', // Add color here
    icon: "⏳" // Add an icon if necessary
  },
];

export default function Features() {
  return (
    <div className="py-12 px-6 bg-mario-brown">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-8 text-mario-yellow font-pixel-large">Power-Ups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className={`text-center p-6 ${step.color} rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-2xl mb-2 text-white font-pixel-large">{step.name}</h3>
              <p className="text-mario-yellow font-pixel">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
