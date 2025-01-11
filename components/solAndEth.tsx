import { mnemonicToSeed } from "bip39";
import React, { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
export default function SolAndEth({ mnemonic }: any) {
  const [solAddress, setSolAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [solKey, setSolKey] = useState("");
  const [ethKey, setEthKey] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleGenerateSol = async () => {
    console.log(mnemonic, "is here");
    if (!mnemonic) {
      throw new Error();
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
    console.log("eth here");
    const seed = await mnemonicToSeed(mnemonic);
  };

  return (
    <div className="p-6 rounded-lg w-full max-w-screen-lg mx-auto">
      <div className="flex flex-wrap justify-between items-start mb-2 text-white">
        <div className="group relative rounded-xl p-[1px] my-8 w-full md:w-5/12">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-300 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative rounded-xl border border-gray-700 bg-gray-800 p-6 space-y-4">
            <button
              onClick={handleGenerateSol}
              className="bg-[#9b8e6e] mx-auto w-full text-white font-semibold py-3 px-6 rounded-2xl shadow-lg text-center hover:from-slate-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              Generate Solana Wallet
            </button>

            <div className="flex flex-col items-start w-full">
              <label className="block text-lg font-medium mb-1 text-gray-400 self-start">
                Wallet Address
              </label>
              <div className="flex w-full border border-gray-700 rounded-2xl">
                <input
                  type="text"
                  readOnly
                  className="flex-1 px-3 py-2 focus:outline-none bg-transparent text-white rounded-l-lg"
                  value={solAddress}
                  onChange={(e) => handleInputChange(e, setSolAddress)}
                />
                <button className="p-2 text-gray-400 hover:text-white focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <label className="block text-lg font-medium mb-1 text-gray-400 self-start">
                Private Key
              </label>
              <div className="flex w-full border border-gray-700 rounded-2xl">
                <input
                  type="password"
                  readOnly
                  className="flex-1 px-3 py-2 focus:outline-none bg-transparent text-white rounded-l-lg"
                  value={solKey}
                  onChange={(e) => handleInputChange(e, setSolKey)}
                />
                <button className="p-2 text-gray-400 hover:text-white focus:outline-none flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative rounded-xl p-[1px] my-8 w-full md:w-5/12">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-300 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative rounded-xl border border-gray-700 bg-gray-800 p-6 space-y-4">
            <button
              onClick={handleGenerateEth}
              className="bg-[#9b8e6e] mx-auto w-full text-white font-semibold py-3 px-6 rounded-2xl shadow-lg text-center hover:from-slate-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              Generate Ethereum Wallet
            </button>

            <div className="flex flex-col items-start w-full">
              <label className="block text-lg font-medium mb-1 text-gray-400 self-start">
                Wallet Address
              </label>
              <div className="flex w-full border border-gray-700 rounded-2xl">
                <input
                  type="text"
                  readOnly
                  className="flex-1 px-3 py-2 focus:outline-none bg-transparent text-white rounded-l-lg"
                  value={ethAddress}
                  onChange={(e) => handleInputChange(e, setEthAddress)}
                />
                <button className="p-2 text-gray-400 hover:text-white focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <label className="block text-lg font-medium mb-1 text-gray-400 self-start">
                Private Key
              </label>
              <div className="flex w-full border border-gray-700 rounded-2xl">
                <input
                  type="password"
                  readOnly
                  className="flex-1 px-3 py-2 focus:outline-none bg-transparent text-white rounded-l-lg"
                  value={ethKey}
                  onChange={(e) => handleInputChange(e, setEthKey)}
                />
                <button className="p-2 text-gray-400 hover:text-white focus:outline-none flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center mx-auto text-white font-semibold border border-gray-500 rounded-xl bg-gray-700 px-4 py-2 shadow-md transition duration-300 hover:bg-gray-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        {isVisible ? "Hide" : "Show"} Wallets
      </button>
    </div>
  );
}
