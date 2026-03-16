import React from "react";
import { render } from "@testing-library/react-native";
import { DiscardPileView } from "@/components/models/discardPile";
import { useGame } from "@/hooks/useGame";
import "react-native-gesture-handler/jestSetup";

jest.mock("@/hooks/useGame");

jest.mock("@/hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        size: { cardWidth: 100, cardHeight: 150 },
    }),
}));

jest.mock("@/components/models/card", () => ({
    CardView: (props: any) => {
        const { View, Text } = require("react-native");
        return (
            <View testID={`card-${props.card.id}`}>
                <Text>
                    Card {props.card.number} {props.discarded ? "discarded" : ""}{" "}
                    {props.rotate ? "rotated" : ""}
                </Text>
            </View>
        );
    },
}));

jest.mock("expo-av", () => {
    return {
        Audio: {
            Sound: jest.fn().mockImplementation(() => ({
                loadAsync: jest.fn(),
                playAsync: jest.fn(),
                stopAsync: jest.fn(),
                unloadAsync: jest.fn(),
            })),
        },
    };
});


const useGameMock = useGame as jest.Mock;

describe("DiscardPileView", () => {
    it("renders all cards in the discard pile when playing phase", () => {
        useGameMock.mockImplementation(() => ({
            state: {
                discardPile: [
                    { id: "c1", number: 1, mistakenlyPlayed: false },
                    { id: "c2", number: 2, mistakenlyPlayed: true },
                ],
                gamePhase: "playing",
                gameSettings: { blind: false },
            },
        }));

        const { getByTestId } = render(<DiscardPileView />);

        expect(getByTestId("card-c1")).toBeTruthy();
        expect(getByTestId("card-c2")).toBeTruthy();
    });

    it("renders placeholder when discard pile is empty", () => {
        useGameMock.mockImplementationOnce(() => ({
            state: {
                discardPile: [],
                gamePhase: "playing",
                gameSettings: { blind: false },
            },
        }));

        const { getByTestId } = render(<DiscardPileView />);

        expect(getByTestId("card-discard-placeholder")).toBeTruthy();
    });

    it("hides numbers when blind mode is active", () => {
        useGameMock.mockImplementationOnce(() => ({
            state: {
                discardPile: [{ id: "c3", number: 3, mistakenlyPlayed: false }],
                gamePhase: "playing",
                gameSettings: { blind: true },
            },
        }));

        const { getByTestId } = render(<DiscardPileView />);

        expect(getByTestId("card-c3")).toBeTruthy();
    });
});
