import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ButtonView } from './button';

jest.mock("../../hooks/useResponsiveTheme", () => ({
    useResponsiveTheme: () => ({
        size: { circleSize: 40 },
        color: {
            button: {
                primary: {
                    backgroundColor: "blue",
                    hover: "darkblue",
                    pressed: "navy",
                    disabled: "gray",
                    text: "white",
                },
                secondary: {
                    backgroundColor: "white",
                    hover: "lightgray",
                    pressed: "gray",
                    disabled: "gray",
                    text: "black",
                },
            },
            tooltip: {
                backgroundColor: "black",
                text: "white",
            },
        },
        shadow: {},
        textShadow: {},
        font: {
            weight: {
                button: {
                    primary: "bold",
                    secondary: "normal",
                },
            },
        },
    }),
}));

jest.mock("../ui/icon-symbol", () => ({
    IconSymbol: () => null,
}));

describe("ButtonView", () => {
    it("renders button text", () => {
        const { getByText } = render(
            <ButtonView text="Click me" onPress={() => { }} variant="primary" />
        );

        expect(getByText("Click me")).toBeTruthy();
    });

    it("calls onPress when pressed", () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <ButtonView text="Press" onPress={onPressMock} variant="primary" />
        );

        fireEvent.press(getByText("Press"));

        expect(onPressMock).toHaveBeenCalled();
    });

    it("does not call onPress when disabled", () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <ButtonView
                text="Disabled"
                onPress={onPressMock}
                disabled={true}
                variant="primary"
            />
        );

        fireEvent.press(getByText("Disabled"));

        expect(onPressMock).not.toHaveBeenCalled();
    });

    it("shows tooltip when visible", () => {
        const { getByText, queryByText } = render(
            <ButtonView
                text="Hover"
                tooltipText="Tooltip here"
                showTooltip={true}
                onPress={() => { }}
                variant="primary"
            />
        );

        expect(queryByText("Tooltip here")).toBeNull();

        fireEvent(getByText("Hover"), "hoverIn");

        expect(getByText("Tooltip here")).toBeTruthy();
    });
});