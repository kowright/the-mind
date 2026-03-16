import React from "react";
import { render } from "@testing-library/react-native";
import { GameplayView } from "../../../components/phases/gamePlayView";

jest.mock("../../../hooks/useGame", () => ({
    useGame: () => ({
        state: {
            lives: 3,
            shuriken: 1,
            level: { number: 2 },
            winLevel: 5,
            players: [
                { id: "p1", name: "Alice", hand: { cards: [{ id: "c1" }] }, cardCount: 5 },
                { id: "p2", name: "Bob", hand: { cards: [] }, cardCount: 4 },
            ],
            playerId: "p1",
            shurikenCalls: [],
            readyToStartPlayers: [],
            gameSettings: { cardCounts: false },
        },
        playerId: "p1",
    }),
}));

jest.mock("../../../theme/theme", () => ({
    theme: {
        color: {
            gameBackground: { backgroundColor: "black" },
            gameplayIcon: {
                backgroundColor: "gray",
                activeBackgroundColor: "green",
            },
            text: {
                cardCount: "white",
            },
        },
    },
    themeStyles: {
        small: {},
        body: {},
    },
}));

jest.mock("../../../hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        color: {
            gameBackground: { gradient: ["#000", "#111"] },
            gameplayIcon: {
                backgroundColor: "gray",
                activeBackgroundColor: "green",
            },
            text: {
                cardCount: "white",
            },
        },
        size: {
            cardWidth: 50,
            cardHeight: 70,
        },
    }),
}));

jest.mock("../../../services/websocketService", () => ({
    websocketService: { send: jest.fn() },
}));

jest.mock("../../../services/soundService", () => ({
    soundService: { play: jest.fn() },
}));

jest.mock("../../../components/models/gameOverlay", () => {
    const React = require("react");
    const { View } = require("react-native");
    return { GameOverlayView: ({ children }: { children: React.ReactNode }) => <View>{children}</View> };
});

jest.mock("../../../components/models/hand", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return { HandView: ({ clientPlayer }: { clientPlayer: any }) => <View><Text>Hand {clientPlayer.name}</Text></View> };
});

jest.mock("../../../components/models/button", () => {
    const React = require("react");
    const { Text, TouchableOpacity } = require("react-native");
    return {
        ButtonView: ({ text, onPress }: { text: string; onPress?: () => void }) => (
            <TouchableOpacity onPress={onPress}><Text>{text}</Text></TouchableOpacity>
        )
    };
});

jest.mock("../../../components/models/discardPile", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return { DiscardPileView: ({ keepStacked }: { keepStacked: boolean }) => <View><Text>DiscardPile {keepStacked ? "stacked" : "flat"}</Text></View> };
});

jest.mock("../../../components/models/iconText", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return { IconText: ({ text }: { text: string }) => <Text>{text}</Text> };
});

jest.mock("../../../components/models/levelProgression", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return { LevelProgression: () => <View><Text>LevelProgression</Text></View> };
});

jest.mock("expo-linear-gradient", () => {
    const React = require("react");
    const { View } = require("react-native");
    return { LinearGradient: ({ children }: { children: React.ReactNode }) => <View>{children}</View> };
});

describe("GameplayView", () => {
    it("renders player info and buttons", () => {
        const { getByText } = render(
            <GameplayView agreeToStartVersion={false} discardPileStacked={true} />
        );

        expect(getByText("3")).toBeTruthy(); // lives
        expect(getByText("1")).toBeTruthy(); // shuriken
        expect(getByText("L2/5")).toBeTruthy(); // level

        expect(getByText(/Bob.*4 cards/)).toBeTruthy();

        expect(getByText("Hand Alice")).toBeTruthy(); // hand
        expect(getByText("DiscardPile stacked")).toBeTruthy(); // discard pile
        expect(getByText("PLAY CARD")).toBeTruthy(); // button
    });
});

