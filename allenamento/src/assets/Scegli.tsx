import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const sizes = [3, 4, 5, 6, 7, 8, 9, 10, 12];

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-6">Scegli difficoltà</h1>

      <div className="flex gap-2 flex-col">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => navigate(`/game/${size}`)}
            className="px-6 w-[200px] py-3 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            {size} x {size}
          </button>
        ))}
      </div>
    </div>
  );
}