import { useEffect, useState } from "react";
import { buscarCidade } from "../api/IbgeApi";
import { buscarCoordenadas } from "../api/OpenMeteoApi";

export function useCidade(nomeCidade) {
  const [cidade, setCidade] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nomeCidade) return;

    async function loadData() {
      setLoading(true);
      setCidade(null);

      const response = await buscarCidade(nomeCidade);

      setCidade(response);
      setLoading(false);
    }

    loadData();
  }, [nomeCidade]);

  return { cidade, loading };
}

export function useCoordenadas(nomeCidade) {
  const [coordenadas, setCoordenadas] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nomeCidade) return;

    async function loadData() {
      setLoading(true);
      setCoordenadas(null);

      const response = await buscarCoordenadas(nomeCidade);

      setCoordenadas(response);
      setLoading(false);
    }

    loadData();
  }, [nomeCidade]);

  return { coordenadas, loading };
}
