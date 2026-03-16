import React from "react";
import { render } from "@testing-library/react-native";
import { GameOverlayHeading } from "@/components/models/gameOverlayHeading";

describe("GameOverlayHeading", () => {
    it("renders the heading text correctly", () => {
        const headingText = "Game Over";

        const { getByText } = render(<GameOverlayHeading text={headingText} />);

        expect(getByText(headingText)).toBeTruthy();
    });
});
