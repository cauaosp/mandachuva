export function CidadeCard({ cidade }) {
  return (
    <div
      className="
      border-2
      w-fit
    border-red-500
    p-4
    rounded-xl
    bg-zinc-900
    mt-4"
    >
      <h2>{cidade.nome}</h2>
      <p>{cidade.id}</p>
      <p>{cidade.estado}</p>
      <p>{cidade.regiao}</p>
    </div>
  );
}
