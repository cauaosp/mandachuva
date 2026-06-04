import { useState } from "react";
import { useCidade, useCoordenadas } from "../hooks/cidadeHook";
import { useClima, useTemperatura } from "../hooks/climaHook";
import { CidadeCard } from "../components/CidadeCard";
import { InputBlock } from "../components/InputBlock";

export function CitySearch({ inicialCity = "" }) {
  const [input, setInput] = useState(inicialCity);
  const [buscar, setBuscar] = useState("");

  const { cidade, loading: loadingCidade } = useCidade(buscar);
  const { coordenadas, loading: loadingCoordenadas } = useCoordenadas(buscar);
  const { clima, loading: loadingClima } = useClima(cidade?.data?.id);
  const { temperatura, loading: loadingTemperatura } = useTemperatura(
    coordenadas?.results?.[0]?.latitude,
    coordenadas?.results?.[0]?.longitude,
  );

  const loading =
    loadingCidade || loadingCoordenadas || loadingClima || loadingTemperatura;

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
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      ) : cidade?.status === 200 && coordenadas && temperatura ? (
        <CidadeCard
          cidade={cidade}
          coordenadas={coordenadas ?? null}
          clima={
            clima?.status == 200
              ? {
                  atualizado_em: clima.data?.atualizado_em,
                  ...clima.data?.clima?.[0],
                }
              : null
          }
          temperatura={temperatura}
        />
      ) : (
        input != "" &&
        buscar != "" &&
        cidade?.status !== 200 && (
          <div className="font-bold text-2xl text-red-900">
            {cidade?.message}
          </div>
        )
      )}
      {!loading && input != "" && buscar != "" && (
        <div className="bg-blue-100/50 my-5 w-fit mx-auto p-1 rounded-lg inset-shadow-sm">
          <h2>Retorno:</h2>
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-scroll w-fit mx-auto">
            <pre>{JSON.stringify(cidade, null, 2)}</pre>
            <pre>{JSON.stringify(coordenadas, null, 2)}</pre>
            <pre>{JSON.stringify(clima, null, 2)}</pre>
            <pre>{JSON.stringify(temperatura, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
