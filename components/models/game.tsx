import { Text, View } from 'react-native';
interface GameViewProps {

}


export function GameView() {
    return (
        <>
            <Text> GAME vIEW </Text>
        </>
    );
}

/*function GameView({
    state,
    dispatch,
}: {
    state: GameState;
    dispatch: (action: GameAction) => void;
}) {
    const currentPlayer = state.players.find(
        (p) => p.id === state.currentPlayerId
    )!;

    return (
        <>
            <BoardView state={state} />
            <HandView
                hand={currentPlayer.hand}
                onPlayCard={(card) =>
                    dispatch({ type: 'PLAY_CARD', cardId: card.id })
                }
            />
        </>
    );
}
*/

/*
 EXAMPLE TO SEND INFO TO FE TO MAKE IT DO STUFF
useEffect(() => {
    if (gameState.lastEvent === 'FAILED_ORDER') {
        playFailedOrderAnimation();
    }
}, [gameState.lastEvent]);*/