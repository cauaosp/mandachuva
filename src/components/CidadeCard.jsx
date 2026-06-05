export function CidadeCard({ cidade, coordenadas, clima, temperatura }) {
  return cidade.status != 200 ? (
    <div
      className="
    text-justify border-2
    border-red-500
    p-4
    rounded-lg
    mt-4
    justify-center
    items-center
    mx-auto
    "
    >
      Cidade não encontrada
    </div>
  ) : (
    <div
      className="
      text-justify border-2
      bg-blue-50 border-blue-100
      p-4
      rounded-lg
      mt-4
      mx-auto
      "
    >
      <h2>
        {cidade.data.nome} ({cidade.data.estado})
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <p>Região: {cidade.data.regiao}</p>
        <p>
          População:{" "}
          {coordenadas?.results?.[0]?.population.toLocaleString("pt-BR")}
        </p>
        <p>Latitude: {coordenadas?.results?.[0]?.latitude}</p>
        <p>Longitude: {coordenadas?.results?.[0]?.longitude}</p>
        <p>Temperatura: {temperatura?.current?.temperature_2m}°C</p>
        <p>Altitude: {temperatura?.elevation}m</p>
        <p>
          Data:{" "}
          {
            new Date(temperatura?.current?.time)
              .toLocaleString("pt-BR")
              .split(",")[0]
          }
        </p>
        <p>
          Horário:
          {
            new Date(temperatura?.current?.time)
              .toLocaleString("pt-BR")
              .split(",")[1]
          }
        </p>

        {clima && (
          <div className="col-span-2 outline outline-blue-300 p-1 mb-2 w-full relative grid grid-cols-2 gap-3 rounded-lg">
            <small className="absolute -bottom-6 right-0">
              Atualizado em: {clima.atualizado_em}
            </small>
            <h3 className="col-span-2 font-bold">
              Clima no dia {clima.data.replaceAll("-", "/")}
            </h3>
            <p>
              Condição: {clima.condicao_desc} ({clima.condicao})
            </p>
            <p>Min: {clima.min}</p>
            <p>Max: {clima.max}</p>
            <p>Indíce UV: {clima.indice_uv}</p>
          </div>
        )}
      </div>
    </div>
  );
}
