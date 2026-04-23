import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Tile = {
    number: number;
};

export function Game() {
    const navigate = useNavigate();
    const { size } = useParams();

    function returnHome() {
        navigate("/");
    }

    const n = Number(size);

    if (!n || isNaN(n)) {
        return <div className="text-white">Size non valido</div>;
    }

    const howMuch = n * n;

    function shuffleValid(arr: Tile[], size: number) {
        let state = [...arr];

        const getMoves = (emptyIndex: number) => {
            const moves: number[] = [];

            const row = Math.floor(emptyIndex / size);
            const col = emptyIndex % size;

            const dirs = [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ];

            for (const [dr, dc] of dirs) {
                const r = row + dr;
                const c = col + dc;

                if (r >= 0 && r < size && c >= 0 && c < size) {
                    moves.push(r * size + c);
                }
            }

            return moves;
        };

        for (let i = 0; i < 200; i++) {
            const emptyIndex = state.findIndex((x) => x.number === 0);
            const moves = getMoves(emptyIndex);

            const randomMove =
                moves[Math.floor(Math.random() * moves.length)];

            if (randomMove === undefined) continue;

            [state[emptyIndex], state[randomMove]] = [
                state[randomMove],
                state[emptyIndex],
            ];
        }

        return state;
    }

    function isWin(arr: Tile[]) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].number !== i + 1) return false;
        }
        return arr[arr.length - 1].number === 0;
    }

    const [quad, setQuad] = useState(() =>
        shuffleValid(
            Array.from({ length: howMuch }, (_, i) => ({
                number: i === howMuch - 1 ? 0 : i + 1,
            })),
            n
        )
    );

    const [output, setOutput] = useState("Sfida in corso!");

    function handleClick(index: number) {
        setQuad((prev) => {
            const newArr = [...prev];

            const emptyIndex = newArr.findIndex((x) => x.number === 0);

            const isAdjacent =
                Math.abs(index - emptyIndex) === 1 ||
                Math.abs(index - emptyIndex) === n;

            if (
                Math.abs(index - emptyIndex) === 1 &&
                Math.floor(index / n) !== Math.floor(emptyIndex / n)
            ) {
                return prev;
            }

            if (!isAdjacent) return prev;

            [newArr[index], newArr[emptyIndex]] = [
                newArr[emptyIndex],
                newArr[index],
            ];

            if (isWin(newArr)) {
                setOutput("Hai vinto!");
            }

            return newArr;
        });
    }

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gradient-to-br from-black via-zinc-900 to-black">
            <h1 className="text-[30px] font-bold mb-[10px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Sliding Puzzle
            </h1>

            <div
                className="grid gap-2 p-[20px] w-fit rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl"
                style={{
                    gridTemplateColumns: `repeat(${n}, 40px)`,
                    background: "rgba(20,20,20,0.6)",
                }}
            >
                {quad.map((q, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(i)}
                        className="flex items-center justify-center w-[40px] h-[40px] rounded-lg cursor-pointer
                        bg-white/10 text-white
                        shadow-[0_0_10px_rgba(255,255,255,0.05)]
                        hover:scale-105 hover:bg-white/20
                        transition-all duration-200"
                    >
                        {q.number === 0 ? "" : q.number}
                    </div>
                ))}
            </div>

            <h1 className="w-[200px] text-center mt-4 px-4 py-2 rounded-lg bg-white/10 text-white backdrop-blur">
                {output}
            </h1>
            <button className="w-[200px] text-center mt-4 px-4 py-2 rounded-lg bg-white/10 text-white backdrop-blur" onClick={() => returnHome()}>Home</button>
        </div>
    );
}