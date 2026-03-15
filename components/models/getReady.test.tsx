import React from "react";
import { render } from "@testing-library/react-native";
import { GetReadyView } from "./getReady";

describe("GetReadyView", () => {
    it("renders the text and countdown correctly", () => {
        const countdown = 3;
        const text = "Get Ready";

        const { getByText } = render(<GetReadyView countdown={countdown} text={text} />);

        expect(getByText(text)).toBeTruthy();

        expect(getByText(countdown.toString())).toBeTruthy();
    });
});
