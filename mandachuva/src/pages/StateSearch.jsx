import { useState } from "react";
import { InputBlock } from "../components/InputBlock";
import { ListCitys } from "../components/ListCitys";
import { useMunicipios } from "../hooks/cidadeHook";

export function StateSearch({ onSelectCity }) {
  const [input, setInput] = useState("");
  const [buscar, setBuscar] = useState("");

  const { municipios, loading: loadindMunicipios } = useMunicipios(buscar);

  const loading = loadindMunicipios;

  return (
    <div className="container grid grid-cols-1 gap-5 p-1">
      <h1 className="text-center">Digite o estado</h1>
      <InputBlock
        input={input}
        setInput={setInput}
        setBuscar={setBuscar}
        placeholder={"UF"}
      />
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      ) : municipios?.status == 200 ? (
        <>
          <ListCitys municipios={municipios} onSelectCity={onSelectCity} />
        </>
      ) : (
        <div className="font-bold text-2xl text-red-900 mt-5">
          {municipios?.message}
        </div>
      )}

      {!loading && input != "" && buscar != "" && (
        <div className="bg-blue-100/50 my-5 w-fit mx-auto p-1 rounded-lg inset-shadow-sm">
          <h2>Retorno: </h2>
          <div className="max-h-96 overflow-y-scroll max-w-150 mx-auto">
            <pre>{JSON.stringify(municipios, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
