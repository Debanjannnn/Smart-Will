const features = [
  {
    name: 'Secure Vault',
    description: 'Your assets are safely stored in a smart contract.',
    icon: '🏰',
    color: 'bg-gradient-to-r from-red-600 to-red-800',
  },
  {
    name: 'Time Lock',
    description: 'Assets become accessible to heirs after 10 years of inactivity from the owner.',
    icon: '⏳',
    color: 'bg-gradient-to-r from-blue-600 to-blue-800',
  },
  {
    name: 'Transparent Transactions',
    description: 'All transactions are fully visible and verifiable on the blockchain.',
    icon: '👁️',
    color: 'bg-gradient-to-r from-green-600 to-green-800',
  },
]


export default function Features() {
  return (
    <div className="py-12 px-6 bg-mario-brown">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-8 text-mario-yellow font-pixel-large">Power-Ups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className={`text-center p-6 ${feature.color} rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl mb-2 text-white font-pixel-large">{feature.name}</h3>
              <p className="text-mario-yellow font-pixel">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
