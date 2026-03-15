import React from 'react';
import { render } from '@testing-library/react-native';
import { RuleText } from '@/components/models/ruleText';

describe('RuleText', () => {
    it('renders children text', () => {
        const { getByText } = render(<RuleText>Sample Rule</RuleText>);
        expect(getByText('Sample Rule')).toBeTruthy();
    });

    it('renders with specified line breaks', () => {
        const { getByText } = render(<RuleText breaks={2}>With Breaks</RuleText>);
        const renderedText = getByText('\n\nWith Breaks');
        expect(renderedText).toBeTruthy();
    });

    it('defaults breaks to 0 when not specified', () => {
        const { getByText } = render(<RuleText>Default Breaks</RuleText>);
        expect(getByText('Default Breaks')).toBeTruthy();
    });
});
