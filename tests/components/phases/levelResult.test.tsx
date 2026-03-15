import React from "react";
import { render } from "@testing-library/react-native";
import { LevelResultView } from "@/components/phases/levelResult";
import { } from '@/hooks/useResponsiveTheme'

jest.mock("@/hooks/useGame", () => ({
    useGame: () => ({
        state: {
            level: { number: 2 },
            shurikenedCards: [
                { id: "card1", value: "5" },
                { id: "card2", value: "7" },
            ],
            lastRemovedCards: [{ id: "card0", value: "3" }],
        },
    }),
}));

jest.mock("@/hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        color: { gameBackground: { backgroundColor: "white" } },
        size: { cardWidth: 10 },
    }),
}));

// Mock sound service
jest.mock("@/services/soundService", () => ({
    soundService: {
        play: jest.fn(),
    },
}));

// Mock child components
jest.mock("@/components/models/gameOverlay", () => ({
    GameOverlayView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/models/gameOverlayHeading", () => ({
    GameOverlayHeading: ({ text }: { text: string }) => {
        const { Text } = require("react-native");
        return <Text>{text}</Text>;
    },
}));

jest.mock("@/components/models/iconText", () => ({
    IconText: ({ text }: { text: string }) => {
        const { Text } = require("react-native");
        return <Text>{text}</Text>;
    },
}));

jest.mock("@/components/models/discardPile", () => ({
    DiscardPileView: ({ keepStacked }: { keepStacked: boolean }) => {
        const { Text } = require("react-native");
        return <Text>DiscardPileView ({keepStacked ? "stacked" : "flat"})</Text>;
    },
}));

jest.mock("@/components/models/card", () => ({
    CardView: ({ card }: { card: any }) => {
        const { Text } = require("react-native");
        return <Text>Card {card.value}</Text>;
    },
}));

describe("LevelResultView", () => {
    it("renders level heading and rewards", () => {
        const { getByText } = render(<LevelResultView />);
        expect(getByText("YOU BEAT LEVEL 1!")).toBeTruthy();
        expect(getByText("RECEIVED REWARD:")).toBeTruthy();
        expect(getByText("NEXT LEVEL REWARD:")).toBeTruthy();
    });

    it("renders discarded cards if shurikenedCards exist", () => {
        const { getByText } = render(<LevelResultView />);
        expect(getByText("Removed Cards:")).toBeTruthy();
        expect(getByText("Card 5")).toBeTruthy();
        expect(getByText("Card 7")).toBeTruthy();
    });

    it("renders the discard pile component", () => {
        const { getByText } = render(<LevelResultView />);
        expect(getByText(/DiscardPileView/)).toBeTruthy();
    });

    it("calls soundService.play on mount", () => {
        const { soundService } = require("@/services/soundService");
        render(<LevelResultView />);
        expect(soundService.play).toHaveBeenCalledWith("win");
    });
});
