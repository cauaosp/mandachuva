export function InputBlock({ input, setInput, setBuscar, placeholder }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setBuscar(input);
          }
        }}
        className="bg-blue-50 border-2 p-2 rounded-lg"
      />
      <button
        className="bg-blue-50 border-2 rounded-lg p-2 font-bold text-sm"
        onClick={() => {
          setBuscar(input);
        }}
      >
        BUSCAR
      </button>
    </div>
  );
}
