export function CidadeCard({ cidade }) {
  return (
    <div
      className="
      text-justify border
      bg-blue-50 border-blue-100
      p-4
      rounded-lg
      mt-4
      mx-auto
      "
    >
      <h2>
        {cidade?.cidade} ({cidade?.estado})
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {showData("Região", cidade?.regiao)}
        {showData("População", cidade?.populacao)}
        {showData("Latitude", cidade?.coordenadas?.latitude)}
        {showData("Longitude", cidade?.coordenadas?.longitude)}
        {showData("Altitude", cidade?.coordenadas?.elevation)}
        {showData("Temperatura", cidade?.temperatura)}
        {showData("Data", cidade?.atualizado_em?.replaceAll("-", "/"))}

        {cidade?.clima && (
          <div className="col-span-2 outline outline-blue-300 p-1 mb-2 w-full grid grid-cols-2 gap-3 rounded-lg">
            <h3 className="col-span-2">
              Clima no dia {cidade?.clima[0]?.data}
            </h3>
            {showData("Condição", cidade?.clima[0]?.condicao_desc)}
            {showData("Min", cidade?.clima[0]?.min)}
            {showData("Max", cidade?.clima[0]?.max)}
            {showData("Indíce UV", cidade?.clima[0]?.indice_uv)}
          </div>
        )}
      </div>
    </div>
  );
}

function showData(label, value = "-") {
  return (
    <div className="flex gap-2">
      <p className="font-bold">{label}:</p>
      <p>{value}</p>
    </div>
  );
}
