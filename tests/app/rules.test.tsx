import React from "react";
import { render } from "@testing-library/react-native";
import TabThreeScreen from "@/app/(tabs)/rules";

// Mock theme
jest.mock("@/theme/theme", () => ({
  theme: {
    color: {
      gameBackground: { backgroundColor: "black" },
      gameplayIcon: { voted: "red" },
    },
  },
  themeStyles: {
    gameTitle: {},
    title: {},
    body: {},
  },
}));

// Mock ToggleText
jest.mock("@/components/models/toggleText", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    ToggleText: ({ title, children }) => (
      <View>
        <Text>{title}</Text>
        {children}
      </View>
    ),
  };
});

// Mock LevelProgression
jest.mock("@/components/models/levelProgression", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    LevelProgression: () => <Text>LevelProgression</Text>,
  };
});

// Mock IconText
jest.mock("@/components/models/iconText", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    IconText: ({ text }) => <Text>{text}</Text>,
  };
});

// Mock CardView
jest.mock("@/components/models/card", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    CardView: ({ card }) => <Text>Card {card.number}</Text>,
  };
});

// Mock RuleText
jest.mock("@/components/models/ruleText", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    RuleText: ({ children }) => <Text>{children}</Text>,
  };
});

describe("TabThreeScreen (Rules)", () => {
  test("renders title and rules header", () => {
    const { getByText } = render(<TabThreeScreen />);

    expect(getByText("THE MIND")).toBeTruthy();
    expect(getByText("RULES")).toBeTruthy();
  });

  test("renders rule sections", () => {
    const { getByText } = render(<TabThreeScreen />);

    expect(getByText("Goal")).toBeTruthy();
    expect(getByText("Gameplay")).toBeTruthy();
    expect(getByText("Phases")).toBeTruthy();
    expect(getByText("Levels")).toBeTruthy();
    expect(getByText("Cards")).toBeTruthy();
    expect(getByText("Lives")).toBeTruthy();
    expect(getByText("Shuriken")).toBeTruthy();
    expect(getByText("Thumbs Up")).toBeTruthy();
  });

    test("renders example components", () => {
        const { getByText, getAllByText } = render(<TabThreeScreen />);

        expect(getByText("LevelProgression")).toBeTruthy();
        expect(getAllByText("Card 50")).toHaveLength(2);
    });

});
