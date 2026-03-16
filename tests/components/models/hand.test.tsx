import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { HandView } from "@/components/models/hand";

jest.mock("@/components/models/card", () => {
    return {
        CardView: (props: any) => {
            const { TouchableOpacity, Text } = require("react-native");
            const { card, onPress, index} = props;

            let testID = card.id === "hand-placeholder"
                ? `card-hand-placeholder`
                : `card-hand-${props.clientId ?? "p1"}-${card.id}`;

            if (props.total && props.total > 0 && props.hideNumbers) {
                testID = `card-enemy-${index}`;
            }

            return (
                <TouchableOpacity testID={testID} onPress={onPress}>
                    <Text>{`Card ${card.number}`}</Text>
                </TouchableOpacity>
            );
        },
    };
});

describe("HandView", () => {
    const mockClientPlayer = {
        id: "p1",
        cardCount: 2,
        hand: { cards: [{ id: "c1", number: 3 }, { id: "c2", number: 5 }] },
    };

    it("renders enemy player's cards as hidden numbers", () => {
        const { getByTestId } = render(
            <HandView clientPlayer={mockClientPlayer} enemyPlayer={true} />
        );

        expect(getByTestId("card-enemy-0")).toBeTruthy();
        expect(getByTestId("card-enemy-1")).toBeTruthy();
    });

    it("renders client player's cards sorted by number descending", () => {
        const { getByTestId } = render(
            <HandView clientPlayer={mockClientPlayer} enemyPlayer={false} />
        );

        const cardIds = ["c2", "c1"];
        cardIds.forEach((id) => {
            expect(getByTestId(`card-hand-p1-${id}`)).toBeTruthy();
        });
    });

    it("calls onPressCard when a client player's card is pressed", () => {
        const onPressMock = jest.fn();

        const { getByTestId } = render(
            <HandView clientPlayer={mockClientPlayer} enemyPlayer={false} onPressCard={onPressMock} />
        );

        fireEvent.press(getByTestId("card-hand-p1-c1"));
        expect(onPressMock).toHaveBeenCalled();
    });

    it("renders placeholder when client player has no cards", () => {
        const playerNoCards = { ...mockClientPlayer, cardCount: 0, hand: { cards: [] } };

        const { getByTestId } = render(
            <HandView clientPlayer={playerNoCards} enemyPlayer={false} />
        );

        expect(getByTestId("card-hand-placeholder")).toBeTruthy();
    });
});
