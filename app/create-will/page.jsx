import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlayerStats from '@/components/PlayerStats'

export default function CreateWill() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    beneficiary: '',
    assets: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Form data:', formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-mario-blue text-white pixelated">
      <div className="absolute inset-0 pixel-bg"></div>
      <div className="relative z-10">
        <Header walletConnected={true} connectWallet={() => {}} />
        <main className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="pixel-box mb-8">
              <h1 className="text-3xl mb-8 text-center text-mario-yellow">Create Your Digital Will</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xl mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-mario-dark-grey text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mario-yellow"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xl mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-mario-dark-grey text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mario-yellow"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="beneficiary" className="block text-xl mb-2">
                    Beneficiary
                  </label>
                  <input
                    type="text"
                    id="beneficiary"
                    name="beneficiary"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    className="w-full bg-mario-dark-grey text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mario-yellow"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="assets" className="block text-xl mb-2">
                    Assets
                  </label>
                  <textarea
                    id="assets"
                    name="assets"
                    value={formData.assets}
                    onChange={handleChange}
                    className="w-full bg-mario-dark-grey text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mario-yellow"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-mario-yellow text-mario-blue px-4 py-2 rounded-md hover:bg-mario-light-yellow focus:outline-none focus:ring-2 focus:ring-mario-blue"
                >
                  Create Will
                </button>
              </form>
            </div>
            <PlayerStats
              name={formData.name}
              email={formData.email}
              beneficiary={formData.beneficiary}
              assets={formData.assets}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

