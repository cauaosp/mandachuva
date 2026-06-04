export function ListCitys({ municipios, onSelectCity }) {
  return (
    <div className="grid grid-cols-4">
      {municipios?.data?.map((municipio) => (
        <div
          key={municipio.codigo_ibge}
          className="rounded p-2 shadow-sm"
          onClick={() => onSelectCity(municipio.nome)}
        >
          <p className="font-bold">{municipio.nome}</p>
        </div>
      ))}
    </div>
  );
}
