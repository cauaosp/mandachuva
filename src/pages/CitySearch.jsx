import { useState } from "react";

import { CidadeCard } from "../components/CidadeCard";
import { InputBlock } from "../components/InputBlock";
import { useCidade } from "../hooks/cidadeHook";

export function CitySearch({ inicialCity = "" }) {
  const [input, setInput] = useState(inicialCity);
  const [buscar, setBuscar] = useState("");

  const { cidade, loading } = useCidade(buscar.toLowerCase().trim());

  return (
    <div className="container grid grid-cols-1 gap-5 p-1">
      <h1 className="text-center">Digite o município</h1>
      <InputBlock
        input={input}
        setInput={setInput}
        setBuscar={setBuscar}
        placeholder={"cidade"}
      />

      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      ) : cidade?.status == 200 ? (
        <CidadeCard cidade={cidade?.data} />
      ) : (
        <div className="font-bold text-2xl text-red-900">
          {cidade?.data?.erro}
        </div>
      )}

      {!loading && input != "" && buscar != "" && (
        <div className="bg-blue-100/50 my-5 w-fit mx-auto p-1 rounded-lg inset-shadow-sm">
          <h2>Retorno:</h2>
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-scroll w-fit mx-auto">
            {console.log("cidade", cidade)}
            {console.log("status", cidade?.status)}
            <pre>{JSON.stringify(cidade?.data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
