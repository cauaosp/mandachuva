import { useEffect, useState } from "react";
import { buscarCidade } from "../api/IbgeApi";
import { buscarCoordenadas } from "../api/OpenMeteo";

export function useCidade(nomeCidade) {
  const [cidade, setCidade] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await buscarCidade(nomeCidade);

      setCidade(response);
    }

    loadData();
  }, [nomeCidade]);

  return cidade;
}

export function useCoordenadas(nomeCidade) {
  const [cidade, setCidade] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await buscarCoordenadas(nomeCidade);

      setCidade(response);
    }

    loadData();
  }, [nomeCidade]);

  return cidade;
}
