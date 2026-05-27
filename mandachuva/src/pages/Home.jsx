import { useState } from "react";
import { useCidade } from "../hooks/cidadeHook";
import { CidadeCard } from "../components/CidadeCard";

export function Home() {
  const [input, setInput] = useState("");
  const [buscar, setBuscar] = useState("");

  const cidade = useCidade(buscar);

  return (
    <div>
      <h1>Clima</h1>

      <h1>Digite uma cidade</h1>
      <input
        type="text"
        placeholder="cidade"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setBuscar(input)}>Buscar</button>

      {cidade &&
        cidade.map((item) => <CidadeCard key={item.id} cidade={item} />)}
    </div>
  );
}
