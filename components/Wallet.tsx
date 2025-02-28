"use client";
import { useState } from "react";
import Mnemonics from "./Mnemonic";
import { generateMnemonic } from "bip39";
import SolAndEth from "./solAndEth";
export default function Wallet() {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [mnemonic, setMnemonic] = useState<string[]>(
    generateMnemonic().split(" ")
  );

  const handleClick = async () => {
    const values = generateMnemonic();
    console.log(values, "neifnei");

    setMnemonic(values.split(" "));
    setShow(true);
  };

  const showWallets = () => {
    setDisplay(!display);
    console.log("inside showing wallets");
  };

  return (
    <main className="pt-0 flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-white font-semibold text-2xl">
          Secret Phase
        </h1>
        <button
          onClick={() => {
            handleClick();
          }}
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 transform hover:scale-105"
        >
          Generate Secret Phrase
        </button>
      </div>

      <div className="p-4 rounded-xl w-full max-w-screen-lg relative bg-gray-800">
        <div className="flex items-center mb-4">
          <button
            onClick={() => setShow(!show)}
            className=" bg-gray-700 text-gray-300 hover:bg-gray-600
        
        p-2 rounded-full shadow-lg  transition duration-300 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 transform transition-transform duration-300 ${
                show ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </button>

          {show ? (
            <span className="text-gray-200 text-lg font-medium ml-auto">
              Hide Secret Phrase
            </span>
          ) : (
            <span className="text-gray-200 text-lg font-medium ml-auto">
              Show Secret Phrase
            </span>
          )}
        </div>

        {show && (
          <>
            <Mnemonics values={mnemonic} />
          </>
        )}
      </div>

      {display ? (
        <SolAndEth mnemonic={JSON.stringify(mnemonic)} />
      ) : (
        <button
          onClick={showWallets}
          className="bg-gradient-to-r from-slate-500 to-gray-600 
                text-white font-semibold py-3 px-6
                rounded-2xl shadow-lg 
                hover:from-slate-600 hover:to-gray-700 
                transition-all duration-300 
                transform hover:scale-105 
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
        >
          Show Wallets
        </button>
      )}
    </main>
  );
}
