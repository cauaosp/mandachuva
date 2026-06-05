export function ListCitys({ municipios, onSelectCity }) {
  return (
    <div className="grid grid-cols-4 relative mt-10">
      <div className="absolute -top-5 left-0 font-bold">
        Total: {municipios?.data?.length}
      </div>
      {municipios?.data?.map((municipio) => (
        <div
          key={municipio.codigo_ibge}
          className="rounded p-2 text-center mx-auto"
          onClick={() => onSelectCity(municipio.nome)}
        >
          <p className="font-bold cursor-pointer shadow-sm w-fit p-3">
            {municipio.nome}
          </p>
        </div>
      ))}
    </div>
  );
}
