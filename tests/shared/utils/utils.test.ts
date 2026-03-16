// tests/utils/gameUtils.test.ts

import {
    allPlayersHaveNames,
    hasValidPlayerCount,
    makePlayer,
    shuffleDeck,
    resetAllCardMistakes,
    dealCards,
    sortPlayerHands,
    loseLife,
    areAllLivesLost,
    removeLowestCardFromAllHands,
    removeCardsLowerThanCardNumber,
    removeOtherPlayersFromStateForClient,
    resolveEndOfRound,
} from "../../../shared/utils/utils";

describe("player helpers", () => {
    test("allPlayersHaveNames returns true when all players have names", () => {
        const players = [
            { id: "1", name: "Alice", hand: { cards: [] }, cardCount: 0 },
            { id: "2", name: "Bob", hand: { cards: [] }, cardCount: 0 },
        ];

        expect(allPlayersHaveNames(players)).toBe(true);
    });

    test("allPlayersHaveNames returns false when a player has no name", () => {
        const players = [
            { id: "1", name: "", hand: { cards: [] }, cardCount: 0 },
            { id: "2", name: "Bob", hand: { cards: [] }, cardCount: 0 },
        ];

        expect(allPlayersHaveNames(players)).toBe(false);
    });

    test("hasValidPlayerCount validates player count", () => {
        expect(hasValidPlayerCount([{}, {}] as any)).toBe(true);
        expect(hasValidPlayerCount([{}, {}, {}, {}] as any)).toBe(true);
        expect(hasValidPlayerCount([{}] as any)).toBe(false);
        expect(hasValidPlayerCount([{}, {}, {}, {}, {}] as any)).toBe(false);
    });
});

describe("makePlayer", () => {
    test("creates player with default name", () => {
        const player = makePlayer("1");

        expect(player.id).toBe("1");
        expect(player.name).toBe("");
        expect(player.hand.cards).toEqual([]);
    });

    test("creates player with provided name", () => {
        const player = makePlayer("1", "Alice");

        expect(player.name).toBe("Alice");
    });
});

describe("shuffleDeck behavior", () => {

    test("shuffleDeck does not mutate original array", () => {
        const deck = [1, 2, 3, 4];
        const copy = [...deck];

        shuffleDeck(deck);

        expect(deck).toEqual(copy);
    });

});

describe("removeCardsLowerThanCardNumber flags mistakes", () => {

    test("removed cards are marked as mistaken", () => {

        const players = [
            {
                id: "p1",
                hand: {
                    cards: [
                        { number: 2 },
                        { number: 8 }
                    ]
                }
            }
        ] as any;

        const result = removeCardsLowerThanCardNumber(players, 5);

        expect(result.removedCards[0].mistakenlyPlayed).toBe(true);
        expect(result.removedCards[0].mistakenPlayerId).toBe("p1");

    });

});


describe("resetAllCardMistakes", () => {
    test("resets mistaken flags", () => {
        const players = [
            {
                id: "1",
                name: "Alice",
                cardCount: 1,
                hand: {
                    cards: [
                        { number: 1, mistakenlyPlayed: true, mistakenPlayerId: "1" },
                    ],
                },
            },
        ] as any;

        const result = resetAllCardMistakes(players);

        expect(result[0].hand.cards[0].mistakenlyPlayed).toBe(false);
        expect(result[0].hand.cards[0].mistakenPlayerId).toBeUndefined();
    });
});

describe("dealCards", () => {
    test("deals cards evenly based on level", () => {
        const players = [
            makePlayer("1", "Alice"),
            makePlayer("2", "Bob"),
        ];

        const deck = [
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
        ] as any;

        const { players: dealt } = dealCards(players, deck, 2);

        expect(dealt[0].hand.cards.length).toBe(2);
        expect(dealt[1].hand.cards.length).toBe(2);
    });
});

describe("sortPlayerHands", () => {
    test("sorts cards ascending", () => {
        const players = [
            {
                id: "1",
                name: "Alice",
                cardCount: 2,
                hand: {
                    cards: [{ number: 5 }, { number: 1 }],
                },
            },
        ] as any;

        const sorted = sortPlayerHands(players);

        expect(sorted[0].hand.cards[0].number).toBe(1);
    });
});

describe("life helpers", () => {
    test("loseLife decreases life but not below zero", () => {
        expect(loseLife(3)).toBe(2);
        expect(loseLife(0)).toBe(0);
    });

    test("areAllLivesLost works correctly", () => {
        expect(areAllLivesLost(0)).toBe(true);
        expect(areAllLivesLost(2)).toBe(false);
    });
});

describe("removeLowestCardFromAllHands", () => {
    test("removes first card from each player", () => {
        const players = [
            {
                id: "1",
                name: "Alice",
                cardCount: 2,
                hand: { cards: [{ number: 1 }, { number: 3 }] },
            },
            {
                id: "2",
                name: "Bob",
                cardCount: 1,
                hand: { cards: [{ number: 2 }] },
            },
        ] as any;

        const { players: updated, removedCards } =
            removeLowestCardFromAllHands(players);

        expect(removedCards.length).toBe(2);
        expect(updated[0].hand.cards.length).toBe(1);
    });
});

describe("removeCardsLowerThanCardNumber", () => {
    test("removes cards lower than played card", () => {
        const players = [
            {
                id: "1",
                name: "Alice",
                cardCount: 2,
                hand: { cards: [{ number: 2 }, { number: 10 }] },
            },
        ] as any;

        const result = removeCardsLowerThanCardNumber(players, 5);

        expect(result.removedCards.length).toBe(1);
        expect(result.editedPlayers[0].hand.cards.length).toBe(1);
    });
});

describe("removeOtherPlayersFromStateForClient", () => {
    test("removes other players hands", () => {
        const state = {
            players: [
                { id: "1", hand: { cards: [{ number: 1 }] } },
                { id: "2", hand: { cards: [{ number: 2 }] } },
            ],
        } as any;

        const result = removeOtherPlayersFromStateForClient(state, "1");

        expect(result.players[0].hand.cards.length).toBe(1);
        expect(result.players[1].hand.cards.length).toBe(0);
    });
});

describe("resolveEndOfRound", () => {
    test("game ends when lives reach zero", () => {
        const state = {
            gamePhase: "playing",
            gameOutcome: "",
            winLevel: 5,
        } as any;

        const result = resolveEndOfRound(state, [], 0, 1, { number: 1 } as any);

        expect(result.updatedGamePhase).toBe("gameOver");
        expect(result.updatedGameOutcome).toBe("lost");
    });


    const baseState = {
        gamePhase: "playing",
        gameOutcome: "",
        winLevel: 5,
    };

    test("round continues when players still have cards", () => {
        const players = [
            {
                id: "1",
                hand: { cards: [{ number: 10 }] },
            },
        ] as any;

        const result = resolveEndOfRound(
            baseState as any,
            players,
            3,
            1,
            { number: 2 } as any
        );

        expect(result.updatedGamePhase).toBe("playing");
    });


    test("level completes when all hands empty but not final level", () => {
        const players = [
            { id: "1", hand: { cards: [] } },
            { id: "2", hand: { cards: [] } },
        ] as any;

        const result = resolveEndOfRound(
            baseState as any,
            players,
            3,
            1,
            { number: 2 } as any
        );

        expect(result.updatedGamePhase).toBe("levelComplete");
    });


    test("game is won when final level is completed", () => {
        const players = [
            { id: "1", hand: { cards: [] } },
            { id: "2", hand: { cards: [] } },
        ] as any;

        const result = resolveEndOfRound(
            baseState as any,
            players,
            3,
            1,
            { number: 5 } as any
        );

        expect(result.updatedGamePhase).toBe("gameOver");
        expect(result.updatedGameOutcome).toBe("won");
    });


    test("next level is selected when level completes", () => {
        const players = [
            { id: "1", hand: { cards: [] } },
            { id: "2", hand: { cards: [] } },
        ] as any;

        const result = resolveEndOfRound(
            baseState as any,
            players,
            3,
            1,
            { number: 1 } as any
        );

        expect(result.updatedLevel.number).toBe(2);
    });
});
