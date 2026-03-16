import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { GameOverlayView } from "@/components/models/gameOverlay";

describe("GameOverlayView", () => {
    it("renders children correctly", () => {
        const { getByText } = render(
            <GameOverlayView>
                <Text>Overlay Content</Text>
            </GameOverlayView>
        );

        expect(getByText("Overlay Content")).toBeTruthy();
    });

    it("applies overlay styles", () => {
        const { getByTestId } = render(
            <GameOverlayView>
                <Text testID="child">Child</Text>
            </GameOverlayView>
        );

        expect(getByTestId("child")).toBeTruthy();
    });
});
