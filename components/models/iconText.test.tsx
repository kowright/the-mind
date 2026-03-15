import React from 'react';
import { render } from '@testing-library/react-native';
import { IconText } from './iconText';

// Mock IconSymbol to avoid rendering native SVGs
jest.mock('../ui/icon-symbol', () => ({
    IconSymbol: ({ name, size, color }: any) => {
        const { View, Text } = require('react-native');
        return (
            <View testID={`icon-${name}`}>
                <Text>{`Icon ${name} size:${size} color:${color}`}</Text>
            </View>
        );
    },
}));

describe('IconText', () => {
    it('renders text and icon with iconFirst true', () => {
        const { getByText, getByTestId } = render(
            <IconText iconFirst={true} text="Hello" iconName="heart.fill" />
        );

        expect(getByText('Hello')).toBeTruthy();
        const icon = getByTestId('icon-heart.fill');
        expect(icon).toBeTruthy();
    });

    it('renders text and icon with iconFirst false', () => {
        const { getByText, getByTestId } = render(
            <IconText iconFirst={false} text="World" iconName="staroflife.fill" />
        );

        expect(getByText('World')).toBeTruthy();
        const icon = getByTestId('icon-staroflife.fill');
        expect(icon).toBeTruthy();
    });

    it('applies altColor and altIconSize overrides', () => {
        const { getByTestId } = render(
            <IconText
                iconFirst={true}
                text="Custom"
                iconName="hare.fill"
                altColor="blue"
                altIconSize={50}
            />
        );

        const icon = getByTestId('icon-hare.fill');
        expect(icon.props.children.props.children).toContain('color:blue');
        expect(icon.props.children.props.children).toContain('size:50');
    });
});
