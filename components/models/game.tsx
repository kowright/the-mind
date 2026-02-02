interface GameViewProps {

}

// create initial game state here

export function GameView() {
    return (
        <>
            GameView
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