import { useState } from "react";
import { useCidade, useCoordenadas } from "../hooks/cidadeHook";
import { useClima /**useTemperatura**/ } from "../hooks/climaHook";
import { CidadeCard } from "../components/CidadeCard";

export function Home() {
  const [input, setInput] = useState("");
  const [buscar, setBuscar] = useState("");

  // const latitude = coordenadas?.results?.[0]?.latitude;
  // const longitude = coordenadas?.results?.[0]?.longitude;
  const { cidade, loading: loadingCidade } = useCidade(buscar);
  const { coordenadas, loading: loadingCoordenadas } = useCoordenadas(buscar);
  const { clima, loading: loadingClima } = useClima(cidade?.data?.id);

  const loading = loadingCidade || loadingCoordenadas || loadingClima;

  return (
    <div className="container grid grid-cols-1 gap-5 mt-10">
      <h1>Digite o município</h1>
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="cidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setBuscar(input);
            }
          }}
          className="border border-2 p-2 rounded-lg"
        />
        <button
          className="bg-gray-200 border rounded-lg p-2 font-bold"
          onClick={() => {
            setBuscar(input);
          }}
        >
          buscar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        cidade?.status === 200 &&
        coordenadas && (
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
          />
        )
      )}
    </div>
  );
}
