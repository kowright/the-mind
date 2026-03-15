import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ToggleText } from "@/components/models/toggleText";
import { Text } from "react-native"; 
// Proper mock
jest.mock("@/components/models/iconText", () => ({
    IconText: ({ text }: { text: string }) => {
        const React = require("react");
        const { Text } = require("react-native");
        return <Text>{text}</Text>;
    },
}));

describe("ToggleText", () => {
    it("renders title text", () => {
        const { queryByText } = render(
            <ToggleText title="Test Title">Content</ToggleText>
        );
        expect(queryByText("Test Title")).toBeTruthy();
    });

    it("does not render children by default if defaultOpen is false", () => {
        const { queryByText } = render(
            <ToggleText title="Test Title">Hidden Content</ToggleText>
        );
        expect(queryByText("Hidden Content")).toBeNull();
    });

    it("renders children if defaultOpen is true", () => {
        const { queryByText } = render(
            <ToggleText title="Test Title" defaultOpen>
                <Text>Visible Content</Text>
            </ToggleText>
        );
        expect(queryByText("Visible Content")).toBeTruthy();
    });

    it("toggles children when pressed", () => {
        const { queryByText, getByText } = render(
            <ToggleText title="Toggle Me">
                <Text>Toggle Content</Text>
            </ToggleText>
        );

        const header = getByText("Toggle Me");

        expect(queryByText("Toggle Content")).toBeNull();

        fireEvent.press(header);
        expect(queryByText("Toggle Content")).toBeTruthy();

        fireEvent.press(header);
        expect(queryByText("Toggle Content")).toBeNull();
    });

});
