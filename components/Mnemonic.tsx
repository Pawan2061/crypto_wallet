interface MnemonicsProps {
  values: string[]; // Expect an array of words
}

export default function Mnemonics({ values }: MnemonicsProps) {
  console.log(values, "value are here also");

  return (
    <main className=" text-red-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {values.map((value: string, index: number) => (
          <div
            key={index}
            className="bg-gray-800 cursor-pointer rounded-2xl text-gray-300 flex justify-center items-center h-14  border border-gray-600 shadow-lg hover:bg-gray-700 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
          >
            <h1>{value}</h1>
          </div>
        ))}

        <div className="col-span-full flex justify-end">
          <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl shadow-lg font-semibold hover:bg-gray-600 hover:text-white transition duration-300">
            Copy Grid
          </button>
        </div>
      </div>
    </main>
  );
}
