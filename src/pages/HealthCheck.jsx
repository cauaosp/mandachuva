import { useHealthCheck } from "../hooks/healthHook";

export function HealthCheck() {
  const health = useHealthCheck();

  if (!health) {
    return (
      <div className="flex justify-center items-center mt-5">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 mt-5">
      <p>
        <span className="font-bold">BrasilAPI:</span>{" "}
        {health.servicos.brasilapi}
      </p>

      <p>
        <span className="font-bold">Geocoding:</span>{" "}
        {health.servicos.geocoding}
      </p>

      <p>
        <span className="font-bold">Open-Meteo:</span>{" "}
        {health.servicos.openmeteo}
      </p>

      <p>
        <span className="font-bold">Verificado em:</span>{" "}
        {new Date(health.timestamp).toLocaleString("pt-BR").replace(",", " - ")}
      </p>
    </div>
  );
}
