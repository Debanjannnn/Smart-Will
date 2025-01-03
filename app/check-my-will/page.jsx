'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSmartWill } from "@/context/SmartWillContext"
import { Loader2, Edit, PlusCircle } from 'lucide-react'

const CheckMyWill = () => {
  const [willDetails, setWillDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { account, connectWallet, getWillDetails } = useSmartWill()
  const router = useRouter()

  useEffect(() => {
    if (!account) {
      connectWallet()
    } else {
      const fetchWill = async () => {
        try {
          const details = await getWillDetails(account)
          setWillDetails(details)
        } catch (err) {
          setError("Error fetching will details.")
        } finally {
          setLoading(false)
        }
      }

      fetchWill()
    }
  }, [account, connectWallet, getWillDetails])

  const handleEditWill = () => {
    router.push("/create-will")
  }

  return (
    <div className="py-14 px-6 text-center h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Press_Start_2P'] text-[#ffbf00] mb-8">
          My Will
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-[#ff5733] animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-600 text-white p-4 rounded-xl font-['Press_Start_2P'] text-sm">
            {error}
          </div>
        ) : willDetails ? (
          <>
            <div className="bg-[#2c2c2c] p-6 rounded-xl shadow-lg border-4 border-[#ff5733]">
              <h2 className="text-2xl font-['Press_Start_2P'] text-[#ffbf00] mb-6">
                Will Details
              </h2>
              <div className="space-y-4 text-left">
                <p className="font-['Press_Start_2P'] text-[#ff5733] text-sm">
                  <span className="text-white">Beneficiary:</span> {willDetails[3]}
                </p>
                <p className="font-['Press_Start_2P'] text-[#ff5733] text-sm">
                  <span className="text-white">Instructions:</span> {willDetails[4]}
                </p>
                <p className="font-['Press_Start_2P'] text-[#ff5733] text-sm">
                  <span className="text-white">Date Created:</span>{' '}
                  {new Date(Number(willDetails[2])).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-8">
                <Button
                  onClick={handleEditWill}
                  className="bg-blue-600 text-white font-['Press_Start_2P'] text-sm px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transform hover:bg-blue-700 hover:scale-105 transition-transform"
                >
                  <Edit className="w-5 h-5" /> Edit Will
                </Button>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <img
                src="https://media1.tenor.com/m/_bRpTU5IlMYAAAAd/contract-official.gif"
                alt="Pixelated scroll"
                className="object-contain image-pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </>
        ) : (
          <div>

          </div>
        )}
      </div>
    </div>
  )
}

export default CheckMyWill
