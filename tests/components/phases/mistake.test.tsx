import React from "react";
import { render } from "@testing-library/react-native";
import { MistakeView } from "@/components/phases/mistake";

jest.mock("../../../hooks/useGame", () => ({
    useGame: () => ({
        state: {
            lastRemovedCards: [{ id: "1" }, { id: "2" }],
            lastPlayedCard: { id: "last" },
            gameSettings: { skippedCards: false },
        },
    }),
}));

jest.mock("../../../hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        size: { cardWidth: 50 },
    }),
}));

jest.mock("../../../services/soundService", () => ({
    soundService: { play: jest.fn() },
}));

jest.mock("../../../components/models/gameOverlay", () => {
    const React = require("react");
    const { View } = require("react-native");
    return {
        GameOverlayView: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
    };
});

jest.mock("../../../components/models/gameOverlayHeading", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return {
        GameOverlayHeading: ({ text }: { text: string }) => <Text>{text}</Text>,
    };
});

jest.mock("../../../components/models/card", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return {
        CardView: ({ card }: { card: any }) => <View><Text>Card {card.id}</Text></View>,
    };
});

jest.mock("../../../components/models/getReady", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return {
        GetReadyView: ({ text, countdown }: { text: string; countdown: number }) => (
            <Text>{text} {countdown}</Text>
        ),
    };
});

jest.mock("../../../components/models/iconText", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return {
        IconText: ({ text }: { text: string }) => <Text>{text}</Text>,
    };
});

describe("MistakeView", () => {
    it("renders heading, last played card, removed cards, and countdown text", () => {
        const { getByText } = render(<MistakeView countdown={5} />);

        expect(getByText(/LOST 2 LIVES!/i)).toBeTruthy();

        expect(getByText("PLAYED TOO EARLY:")).toBeTruthy();
        expect(getByText("DID NOT PLAY WHEN THEY SHOULD HAVE:")).toBeTruthy();

        expect(getByText("Card last")).toBeTruthy();

        expect(getByText("Card 1")).toBeTruthy();
        expect(getByText("Card 2")).toBeTruthy();

        expect(getByText(/STARTING BACK IN 5/i)).toBeTruthy();
    });

    it("calls soundService.play on mount", () => {
        const { soundService } = require("../../../services/soundService");
        render(<MistakeView countdown={3} />);
        expect(soundService.play).toHaveBeenCalledWith("mistake");
    });
});
