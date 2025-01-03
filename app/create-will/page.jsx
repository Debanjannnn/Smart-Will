"use client";

import React, { useEffect, useState } from "react";
import ethers from "ethers"
import Header from "@/components/Header";
import { isAddress } from "ethers";
import Footer from "@/components/Footer";
import PlayerStats from "@/components/PlayerStats";
import { useSmartWill } from "@/context/SmartWillContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Users, ScrollText, Coins, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateWill() {
  const [formData, setFormData] = useState({
    beneficiary: "",
    assets: "",
    amount: "",
  });
  const [validationError, setValidationError] = useState("");

  const { account, connectWallet, createWill, loading, error, isConnected } =
    useSmartWill();

  useEffect(() => {
    // Connect wallet on component mount if not connected
    if (!isConnected) {
      connectWallet();
    }
  }, [isConnected, connectWallet]);

  const validateForm = () => {
    if (formData.assets.length < 50) {
      setValidationError("Description must be at least 50 characters long");
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setValidationError("Initial deposit amount is required");
      return false;
    }
    if (!isAddress(formData.beneficiary)) {
      setValidationError("Invalid beneficiary address");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure wallet is connected before submission
    if (!isConnected) {
      await connectWallet(); // Trigger wallet connection
    }

    if (!validateForm()) return;

    try {
      const success = await createWill(
        formData.beneficiary,
        formData.assets,
        formData.amount
      );

      if (success) {
        setFormData({
          beneficiary: "",
          assets: "",
          amount: "",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError("");
  };

  return (
    <div className="min-h-screen bg-black to-blue-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10">
        <Header
          walletConnected={isConnected} // Show connection status
          connectWallet={connectWallet}
          account={account} // Pass the wallet address to Header
        />

        <main className="container mx-auto py-24 px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {(error || validationError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || validationError}</AlertDescription>
              </Alert>
            )}

            <Card className="border border-blue-500/20 bg-black/60 backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <CardHeader>
                <CardTitle className="text-3xl font-pixel-large text-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                  Create Your Digital Will
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Label
                        htmlFor="beneficiary"
                        className="text-lg font-pixel-sm text-blue-100 flex items-center gap-2"
                      >
                        <Users className="w-4 h-4" /> Beneficiary Address
                      </Label>
                      <Input
                        type="text"
                        id="beneficiary"
                        name="beneficiary"
                        value={formData.beneficiary}
                        onChange={handleChange}
                        className="font-pixel-sm bg-blue-950/50 border-blue-500/30 text-blue-100 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          placeholder:text-blue-300/50 mt-2"
                        placeholder="0x..."
                        required
                      />
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="amount"
                        className="text-lg font-pixel-sm text-blue-100 flex items-center gap-2"
                      >
                        <Coins className="w-4 h-4" /> Initial Deposit (EDU)
                      </Label>
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="font-pixel-sm bg-blue-950/50 border-blue-500/30 text-blue-100 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          placeholder:text-blue-300/50 mt-2"
                        placeholder="0.1"
                        step="0.000001"
                        min="0"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="assets"
                        className="text-lg font-pixel-sm text-blue-100 flex items-center gap-2"
                      >
                        <ScrollText className="w-4 h-4" /> Assets Description
                      </Label>
                      <Textarea
                        id="assets"
                        name="assets"
                        value={formData.assets}
                        onChange={handleChange}
                        className="font-pixel-sm bg-blue-950/50 border-blue-500/30 text-blue-100 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          placeholder:text-blue-300/50 mt-2 min-h-[120px]
                          transition-all duration-300 hover:bg-blue-950/70"
                        placeholder="Describe your digital assets (minimum 50 characters)..."
                        required
                      />
                      <div className="mt-1 text-sm text-blue-300/70">
                        {formData.assets.length}/50 characters
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full font-pixel-sm bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                      text-black border border-yellow-400/30 rounded-xl px-6 py-6
                      shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                      transition-all duration-300 
                      hover:shadow-[0_0_25px_rgba(234,179,8,0.7)]
                      hover:scale-[1.02] 
                      active:scale-95
                      disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Will"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <PlayerStats
              beneficiary={formData.beneficiary}
              assets={formData.assets}
              amount={formData.amount}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
