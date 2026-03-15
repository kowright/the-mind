import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CardView } from "./card";

// Mock theme hook
jest.mock("../../hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        size: {
            cardWidth: 100,
            cardHeight: 150,
        },
        spacing: {
            cornerNumberSpacing: 4,
        },
        typography: {
            small: 12,
        },
        color: {
            card: {
                primary: "blue",
                mistake: "red",
                gradient: {
                    blueGradient: ["blue", "lightblue"],
                    orangeGradient: ["orange", "yellow"],
                },
            },
        },
    }),
}));

// Mock game hook
jest.mock("../../hooks/useGame", () => ({
    useGame: () => ({
        state: {
            players: [{ id: "1", name: "Alice" }],
        },
    }),
}));

// Mock expo linear gradient
jest.mock("expo-linear-gradient", () => ({
    LinearGradient: ({ children }: any) => children || null,
}));

describe("CardView", () => {
    const mockCard = {
        id: "c1",
        number: 5,
        mistakenlyPlayed: false,
        mistakenPlayerId: undefined,
    };

    it("renders card number", () => {
        const { getAllByText } = render(
            <CardView card={mockCard} total={3} index={0} />
        );

        expect(getAllByText("5").length).toBeGreaterThan(0);
    });

    it("calls onPress when the top card is pressed", () => {
        const onPressMock = jest.fn();

        const { getByTestId } = render(
            <CardView
                card={mockCard}
                total={1}
                index={0}
                onPress={onPressMock}
            />
        );

        fireEvent.press(getByTestId("card-pressable"));

        expect(onPressMock).toHaveBeenCalled();
    });


    it("does not call onPress when card is not the last card", () => {
        const onPressMock = jest.fn();

        const { getByTestId } = render(
            <CardView
                card={mockCard}
                total={3}
                index={0}
                onPress={onPressMock}
            />
        );

        fireEvent.press(getByTestId("card-pressable"));

        expect(onPressMock).not.toHaveBeenCalled();
    });

    it("hides numbers when hideNumbers is true", () => {
        const { queryByText } = render(
            <CardView
                card={mockCard}
                total={1}
                index={0}
                hideNumbers={true}
            />
        );

        expect(queryByText("5")).toBeNull();
    });

    it("shows mistaken player name when card was played incorrectly", () => {
        const mistakenCard = {
            ...mockCard,
            mistakenlyPlayed: true,
            mistakenPlayerId: "1",
        };

        const { getByText } = render(
            <CardView
                card={mistakenCard}
                total={1}
                index={0}
                discarded={true}
            />
        );

        expect(getByText("Alice")).toBeTruthy();
    });
});