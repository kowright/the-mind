import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PauseView } from "@/components/phases/pause";

jest.mock("@/components/models/gameOverlay", () => ({
    GameOverlayView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/models/gameOverlayHeading", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return {
        GameOverlayHeading: ({ text }: { text: string }) => <Text>{text}</Text>,
    };
});

jest.mock("@/components/models/button", () => {
    const React = require("react");
    const { Text, TouchableOpacity } = require("react-native"); 
    return {
        ButtonView: ({ onPress, text }: { onPress: () => void; text: string }) => (
            <TouchableOpacity onPress={onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        ),
    };
});

jest.mock("@/services/websocketService", () => ({
    websocketService: {
        send: jest.fn(),
    },
}));

describe("PauseView", () => {
    it("renders heading and button text", () => {
        const { getByText } = render(<PauseView />);
        expect(getByText("GAME PAUSED")).toBeTruthy();
        expect(getByText("RESUME GAME?")).toBeTruthy();
        expect(getByText("A countdown starts on button press")).toBeTruthy();
    });

    it("calls websocketService.send when button is pressed", () => {
        const { getByText } = render(<PauseView />);
        const button = getByText("RESUME GAME?");
        fireEvent.press(button);

        const { websocketService } = require("../../../services/websocketService");
        expect(websocketService.send).toHaveBeenCalledWith({ type: "PAUSE_OVER" });
    });
});
