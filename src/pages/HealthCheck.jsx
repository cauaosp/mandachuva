import { useHealthCheck } from "../hooks/healthHook";

export function HealthCheck() {
  const health = useHealthCheck();
  console.log(health);

  if (!health) {
    return (
      <div className="flex justify-center items-center mt-5">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return health?.status == 200 ? (
    <div className="grid gap-5 mt-5">
      <p>
        <span className="font-bold">Status:</span> {health?.data?.message}
      </p>

      <p>
        <span className="font-bold">BrasilAPI:</span>{" "}
        {health?.data.servicos.brasilApi}
      </p>

      <p>
        <span className="font-bold">Open-Meteo:</span>{" "}
        {health?.data?.servicos?.openMeteo}
      </p>

      <p>
        <span className="font-bold">Verificado em:</span>{" "}
        {new Date(health?.data?.timestamp)
          .toLocaleString("pt-BR")
          .replace(",", " - ")}
      </p>
    </div>
  ) : (
    <div className="grid gap-5 mt-5">
      <p>
        <span className="font-bold">Status:</span> {health?.data?.message}
      </p>
    </div>
  );
}
