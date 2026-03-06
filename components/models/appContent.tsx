import { Stack } from "expo-router";
import { useContext } from "react";
import { ErrorView } from "../phases/error";
import { GameContext } from "./gameContext";
import GameRouter from "./gameRouter";

export function AppContent() {
    const game = useContext(GameContext);

    if (game?.state.gamePhase === 'error') {
        console.log('error came to AppContent', game?.state.errorMessage);
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