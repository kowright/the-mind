import React from "react";
import { render } from "@testing-library/react-native";
import TabTwoScreen from "@/app/(tabs)/settings";

jest.mock("@/theme/theme", () => ({
    theme: {
        color: {
            gameBackground: { backgroundColor: "black" },
        },
    },
    themeStyles: {
        gameTitle: {},
        title: {},
        body: {},
        heading: {},
    },
}));

jest.mock("@/components/models/settingsItem", () => {
    const React = require("react");
    const { Text } = require("react-native");

    return {
        SettingsItem: ({ settingName }) => <Text>{settingName}</Text>,
    };
});

describe("TabTwoScreen (Settings)", () => {
    test("renders title and heading", () => {
        const { getByText } = render(<TabTwoScreen />);

        expect(getByText("THE MIND")).toBeTruthy();
        expect(getByText("SETTINGS")).toBeTruthy();
    });

    test("renders warning text", () => {
        const { getByText } = render(<TabTwoScreen />);

        expect(
            getByText(/Changes here will make the game significant harder/)
        ).toBeTruthy();
    });

    test("renders main settings", () => {
        const { getByText } = render(<TabTwoScreen />);

        expect(getByText("Skip skipped cards")).toBeTruthy();
        expect(getByText("Card counting")).toBeTruthy();
        expect(getByText("One mind, one life")).toBeTruthy();
        expect(getByText("Blind")).toBeTruthy();
    });

    test("renders upcoming settings section", () => {
        const { getByText } = render(<TabTwoScreen />);

        expect(getByText("Upcoming App Update Settings!")).toBeTruthy();
    });

    test("renders upcoming settings items", () => {
        const { getByText } = render(<TabTwoScreen />);

        expect(getByText("Extreme")).toBeTruthy();
        expect(getByText("Silent chat")).toBeTruthy();
        expect(getByText("No rewards")).toBeTruthy();
        expect(getByText("Timed levels")).toBeTruthy();
    });
});
