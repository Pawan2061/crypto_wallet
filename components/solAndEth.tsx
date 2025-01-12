import { mnemonicToSeed } from "bip39";
import React, { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export default function SolAndEth({ mnemonic }: any) {
  const [solAddress, setSolAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [solKey, setSolKey] = useState("");
  const [ethKey, setEthKey] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleGenerateSol = async () => {
    if (!mnemonic) {
      throw new Error("Mnemonic is required");
    }

    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setIndex(index + 1);
    setSolAddress(keypair.publicKey.toString());
    setSolKey(Buffer.from(keypair.secretKey).toString("hex"));
  };

  const handleGenerateEth = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/60'/${index}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setIndex(index + 1);
    setEthKey(privateKey);
    setEthAddress(wallet.address);
  };

  return (
    <div className="p-6 rounded-lg w-full max-w-screen-lg mx-auto">
      <div className="flex flex-wrap justify-between items-start mb-2 text-white">
        {isVisible && (
          <>
            <div className="group relative rounded-xl p-[1px] my-8 w-full md:w-5/12">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-300 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-xl border border-gray-700 bg-gray-800 p-6 space-y-4">
                <button
                  onClick={handleGenerateSol}
                  className="bg-[#9b8e6e] mx-auto w-full text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Generate Solana Wallet
                </button>

                <>
                  <div className="flex flex-col items-start w-full">
                    <label className="text-lg font-medium mb-1 text-gray-400">
                      Wallet Address
                    </label>
                    <div className="flex w-full border border-gray-700 rounded-2xl">
                      <input
                        type="text"
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent text-white rounded-l-lg"
                        value={solAddress}
                      />
                      <button
                        onClick={() => copyToClipboard(solAddress)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start w-full">
                    <label className="text-lg font-medium mb-1 text-gray-400">
                      Private Key
                    </label>
                    <div className="flex w-full border border-gray-700 rounded-2xl">
                      <input
                        type="password"
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent text-white rounded-l-lg"
                        value={solKey}
                      />
                      <button
                        onClick={() => copyToClipboard(solKey)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>

            <div className="group relative rounded-xl p-[1px] my-8 w-full md:w-5/12">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-300 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-xl border border-gray-700 bg-gray-800 p-6 space-y-4">
                <button
                  onClick={handleGenerateEth}
                  className="bg-[#9b8e6e] mx-auto w-full text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Generate Ethereum Wallet
                </button>

                <>
                  <div className="flex flex-col items-start w-full">
                    <label className="text-lg font-medium mb-1 text-gray-400">
                      Wallet Address
                    </label>
                    <div className="flex w-full border border-gray-700 rounded-2xl">
                      <input
                        type="text"
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent text-white rounded-l-lg"
                        value={ethAddress}
                      />
                      <button
                        onClick={() => copyToClipboard(ethAddress)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start w-full">
                    <label className="text-lg font-medium mb-1 text-gray-400">
                      Private Key
                    </label>
                    <div className="flex w-full border border-gray-700 rounded-2xl">
                      <input
                        type="password"
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent text-white rounded-l-lg"
                        value={ethKey}
                      />
                      <button
                        onClick={() => copyToClipboard(ethKey)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center mx-auto text-white font-semibold border border-gray-500 rounded-xl bg-gray-700 px-4 py-2 shadow-md transition duration-300 hover:bg-gray-600"
      >
        {isVisible ? "Hide" : "Show"} Wallets
      </button>
    </div>
  );
}
