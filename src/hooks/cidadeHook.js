import { useEffect, useState } from "react";
import { buscarClimaCidade, buscarMunicipios } from "../api/backendApi";

export function useCidade(nomeCidade) {
  const [cidade, setCidade] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nomeCidade) return;

    async function loadData() {
      setLoading(true);

      const response = await buscarClimaCidade(nomeCidade);

      setCidade(response);
      setLoading(false);
    }

    loadData();
  }, [nomeCidade]);

  return { cidade, loading };
}

export function useMunicipios(siglaUF) {
  const [municipios, setMunicipios] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!siglaUF) return;

    async function loadData() {
      setLoading(true);

      const response = await buscarMunicipios(siglaUF);

      setMunicipios(response);
      setLoading(false);
    }

    loadData();
  }, [siglaUF]);

  return { municipios, loading };
}
