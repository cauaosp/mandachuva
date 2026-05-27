import { useEffect, useState } from "react";
import { buscarClima } from "../../../mandachuvateste/src/api/ibgeApi";
import { buscarTemperatura } from "../api/OpenMeteo";

export function useClima(idCidade) {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await buscarClima(idCidade);

      const data = await response.json();

      setClima(data);
    }

    loadData();
  }, [idCidade]);

  return clima;
}

export function useTemperatura(latitude, longitude) {
  const [temperatura, setTemperatura] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await buscarTemperatura(latitude, longitude);

      const data = await response.json();

      setTemperatura(data);
    }

    loadData();
  }, [latitude, longitude]);

  return temperatura;
}
