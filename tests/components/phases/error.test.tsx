import React from "react";
import { render } from "@testing-library/react-native";
import { ErrorView } from "@/components/phases/error";
import { Text } from "react-native";

// Mock GameOverlayView and GameOverlayHeading so the test focuses on ErrorView
jest.mock("@/components/models/gameOverlay", () => ({
    GameOverlayView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/models/gameOverlayHeading", () => ({
    GameOverlayHeading: ({ text }: { text: string }) => {
        // require Text locally inside the mock factory to avoid ReferenceError
        const { Text } = require("react-native");
        return <Text>{text}</Text>;
    },
}));

describe("ErrorView", () => {
    it("renders default error message when no errorMessage prop is provided", () => {
        const { getByText } = render(<ErrorView />);
        expect(getByText("ERROR!")).toBeTruthy();
        expect(getByText("You do not have enough players")).toBeTruthy();
    });

    it("renders custom error message when provided", () => {
        const customMessage = "Custom error occurred";
        const { getByText } = render(<ErrorView errorMessage={customMessage} />);
        expect(getByText("ERROR!")).toBeTruthy();
        expect(getByText(customMessage)).toBeTruthy();
    });
});
