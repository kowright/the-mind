import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "@/app/(tabs)/index";
import { websocketService } from "@/services/websocketService";
import { router } from "expo-router";

const mockUseGame = jest.fn();

jest.mock("expo-router", () => ({
    router: { replace: jest.fn() },
}));

jest.mock("@/services/websocketService", () => ({
    websocketService: {
        send: jest.fn(),
    },
}));

jest.mock("@/hooks/useGame", () => ({
    useGame: () => mockUseGame(),
}));

jest.mock("@/hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        color: {
            nameInput: { text: "white", borderColor: "white" },
            gameBackground: { backgroundColor: "black" },
        },
    }),
}));

jest.mock("@/components/tab-view", () => {
    const React = require("react");
    const { View } = require("react-native");
    return { TabView: ({ children }) => <View>{children}</View> };
});

jest.mock("@/components/models/button", () => {
    const React = require("react");
    const { TouchableOpacity, Text } = require("react-native");

    return {
        ButtonView: ({ text, onPress }) => (
            <TouchableOpacity onPress={onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        ),
    };
});

describe("HomeScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        mockUseGame.mockReturnValue({
            playerId: "p1",
            state: {
                gamePhase: "lobby",
                players: [
                    { id: "p1", name: "Alice", hand: { cards: [] }, cardCount: 0 },
                    { id: "p2", name: "Bob", hand: { cards: [] }, cardCount: 0 },
                ],
            },
        });
    });

    test("renders title", () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText("THE MIND")).toBeTruthy();
    });

    test("shows player count", () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText(/There are 2 players/)).toBeTruthy();
    });

    test("start button sends GAME_START", () => {
        const { getByText } = render(<HomeScreen />);

        fireEvent.press(getByText("EVERYONE READY?"));

        expect(websocketService.send).toHaveBeenCalledWith({ type: "GAME_START" });
    });

    test("rename sends PLAYER_NAME_CHANGE", () => {
        const { getByPlaceholderText, getByText } = render(<HomeScreen />);

        fireEvent.changeText(getByPlaceholderText(/Rename/), "Charlie");
        fireEvent.press(getByText("Rename yourself?"));

        expect(websocketService.send).toHaveBeenCalled();
    });

    test("redirects when gamePhase becomes agreeToStart", () => {
        mockUseGame.mockReturnValue({
            playerId: "p1",
            state: {
                gamePhase: "agreeToStart",
                players: [
                    { id: "p1", name: "Alice", hand: { cards: [] }, cardCount: 0 },
                    { id: "p2", name: "Bob", hand: { cards: [] }, cardCount: 0 },
                ],
            },
        });

        render(<HomeScreen />);

        expect(router.replace).toHaveBeenCalledWith("/play");
    });
});
