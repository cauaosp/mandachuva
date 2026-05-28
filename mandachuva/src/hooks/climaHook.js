import { useEffect, useState } from "react";
import { buscarClima } from "../api/IbgeApi";
import { buscarTemperatura } from "../api/OpenMeteoApi";

export function useClima(idCidade) {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idCidade) return;

    async function loadData() {
      setLoading(true);
      const response = await buscarClima(idCidade);

      setClima(response);
      setLoading(false);
    }

    loadData();
  }, [idCidade]);

  return { clima, loading };
}

export function useTemperatura(latitude, longitude) {
  const [temperatura, setTemperatura] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    async function loadData() {
      setLoading(true);
      const response = await buscarTemperatura(latitude, longitude);

      const data = await response.json();

      setTemperatura(data);
      setLoading(false);
    }

    loadData();
  }, [latitude, longitude]);

  return { temperatura, loading };
}
