"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSmartWill } from "@/context/SmartWillContext";

const CheckMyWill = () => {
  const [willDetails, setWillDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { account, connectWallet, getWillDetails } = useSmartWill();
  const router = useRouter();

  useEffect(() => {
    // Auto connect wallet if not already connected
    if (!account) {
      connectWallet();  // Trigger the wallet connection process
    } else {
      const fetchWill = async () => {
        try {
          const details = await getWillDetails(account);
          setWillDetails(details);
        } catch (err) {
          setError("Error fetching will details.");
        } finally {
          setLoading(false);
        }
      };

      fetchWill();
    }
  }, [account, connectWallet, getWillDetails]);

  const handleEditWill = () => {
    router.push("/create-will");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading your will details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Will</h1>

      {/* Check if Will exists */}
      {willDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Will Details</h2>
          <div className="mt-4">
            <p><strong>Beneficiary:</strong> {willDetails[3]}</p>
            {/* <p><strong>Assets:</strong> {willDetails.assets.join(", ")}</p> */}
            <p><strong>Instructions:</strong> {willDetails[4]}</p>
            <p><strong>Date Created:</strong> {new Date(Number(willDetails[2])).toLocaleDateString()}</p>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={handleEditWill} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
              Edit Will
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>You haven't created a will yet.</p>
          <Button onClick={handleEditWill} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-4">
            Create a Will
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckMyWill;
