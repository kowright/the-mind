import { Stack } from "expo-router";
import { useContext } from "react";
import { ErrorView } from "../phases/error";
import { GameContext } from "./gameContext";
import GameRouter from "./gameRouter";
import { createLogger } from "../../shared/types/logger";

const log = createLogger('APP CONTENT')

export function AppContent() {
    const game = useContext(GameContext);

    if (game?.state.gamePhase === 'error') {

        return <ErrorView errorMessage={game?.state.errorMessage} />;
    }

    return (
        <>
            <GameRouter />
            <Stack>
                <Stack.Screen name="play" />
                <Stack.Screen name="gameResult" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}