import React from "react";
import { render } from "@testing-library/react-native";
import { TransitionView } from "@/components/phases/transition";

jest.mock("@/hooks/useGame", () => ({
    useGame: () => ({
        state: {},
    }),
}));

jest.mock("@/components/models/gameOverlay", () => ({
    GameOverlayView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/models/getReady", () => ({
    GetReadyView: ({ text, countdown }: { text: string; countdown: number }) => {
        const { Text } = require("react-native");
        return <Text>{text} {countdown}</Text>;
    },
}));

describe("TransitionView", () => {
    it("renders GetReadyView with countdown", () => {
        const countdownValue = 5;
        const { getByText } = render(<TransitionView countdown={countdownValue} />);

        expect(getByText(`GET READY IN ${countdownValue}`)).toBeTruthy();
    });
});
