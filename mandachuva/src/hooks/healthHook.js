import { useEffect, useState } from "react";
import { buscarCidade } from "../api/IbgeApi";

import { buscarCoordenadas, buscarTemperatura } from "../api/OpenMeteoApi";

export function useHealthCheck() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function check() {
      const resultado = {
        timestamp: new Date().toISOString(),
        servicos: {},
      };

      try {
        const cidade = await buscarCidade("Fortaleza");

        resultado.servicos.brasilapi = cidade.status === 200 ? "OK" : "ERRO";
      } catch {
        resultado.servicos.brasilapi = "ERRO";
      }

      try {
        const geo = await buscarCoordenadas("Fortaleza");

        resultado.servicos.geocoding = geo?.results?.length > 0 ? "OK" : "ERRO";
      } catch {
        resultado.servicos.geocoding = "ERRO";
      }

      try {
        const temp = await buscarTemperatura(-3.73, -38.52);

        resultado.servicos.openmeteo = temp?.current ? "OK" : "ERRO";
      } catch {
        resultado.servicos.openmeteo = "ERRO";
      }

      setHealth(resultado);
    }

    check();
  }, []);

  return health;
}
