import React from "react";
import { render } from "@testing-library/react-native";
import { ShurikenView } from "@/components/phases/shuriken";

// Mock the useGame hook
jest.mock("@/hooks/useGame", () => ({
    useGame: () => ({
        state: {
            lastRemovedCards: [
                { id: "1", value: 5, suit: "hearts" },
                { id: "2", value: 8, suit: "spades" },
            ],
        },
    }),
}));

jest.mock("@/components/models/gameOverlay", () => ({
    GameOverlayView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/models/gameOverlayHeading", () => ({
    GameOverlayHeading: ({ text }: { text: string }) => {
        const { Text } = require("react-native");
        return <Text>{text}</Text>;
    },
}));

jest.mock("@/components/models/card", () => ({
    CardView: ({ card, index, total }: any) => {
        const { Text } = require("react-native");
        return <Text>{`Card ${card.id} (${index + 1}/${total})`}</Text>;
    },
}));

jest.mock("@/components/models/getReady", () => ({
    GetReadyView: ({ text, countdown }: { text: string; countdown: number }) => {
        const { Text } = require("react-native");
        return <Text>{`${text} ${countdown}`}</Text>;
    },
}));

// Mock soundService
jest.mock("@/services/soundService", () => ({
    soundService: {
        play: jest.fn(),
    },
}));

describe("ShurikenView", () => {
    it("renders heading, text, removed cards, and countdown", () => {
        const countdown = 5;
        const { getByText } = render(<ShurikenView countdown={countdown} />);

        // Heading
        expect(getByText("SHURIKEN CALLED!")).toBeTruthy();

        // Main texts
        expect(getByText("Looks like you all can agree on something!")).toBeTruthy();
        expect(getByText("Removed cards: ")).toBeTruthy();

        // Removed cards
        expect(getByText("Card 1 (1/2)")).toBeTruthy();
        expect(getByText("Card 2 (2/2)")).toBeTruthy();

        // Countdown
        expect(getByText(`STARTING AGAIN IN ${countdown}`)).toBeTruthy();
    });

    it("calls soundService.play on mount", () => {
        const { soundService } = require("../../../services/soundService");
        render(<ShurikenView countdown={3} />);
        expect(soundService.play).toHaveBeenCalledWith("shuriken");
    });
});
