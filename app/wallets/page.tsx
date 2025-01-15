"use client";
import React, { useState, useEffect } from "react";
import { WalletInterface } from "../../components/solAndEth";

export default function WalletsPage() {
  const [wallets, setWallets] = useState<WalletInterface[]>([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const savedWallets = localStorage.getItem("wallets");
    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }
  }, []);

  const togglePrivateKey = (walletAddress: string) => {
    setShowPrivateKeys((prev) => ({
      ...prev,
      [walletAddress]: !prev[walletAddress],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-600 mb-6">Your Wallets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl bg-gray-800 p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-white">
              {wallet.walletName}
            </h2>

            <div className="space-y-2">
              <label className="text-gray-400">Wallet Address</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={wallet.walletAdress}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
                <button
                  onClick={() => copyToClipboard(wallet.walletAdress)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Private Key</label>
              <div className="flex items-center space-x-2">
                <input
                  type={
                    showPrivateKeys[wallet.walletAdress] ? "text" : "password"
                  }
                  readOnly
                  value={wallet.privateKey}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
                <button
                  onClick={() => copyToClipboard(wallet.privateKey)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  📋
                </button>
                <button
                  onClick={() => togglePrivateKey(wallet.walletAdress)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  👁️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
