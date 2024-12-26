import { createContext, PropsWithChildren, useMemo } from "react";
import { useEssenceEngine } from "./essence-engine";

export function useGameEngine() {
    const essencesEngine = useEssenceEngine();

    const gameEngine = useMemo(() => {
        return {
            essences: essencesEngine
        }
    }, [
        essencesEngine
    ]);

    return gameEngine;
}

export const GameEngineContext = createContext({} as ReturnType<typeof useGameEngine>);

export function GameEngineProvider({
    children
}: PropsWithChildren) {
    const gameEngine = useGameEngine();

    return <GameEngineContext.Provider value={gameEngine}>
        {children}
    </GameEngineContext.Provider>
}