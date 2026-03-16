import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GameResult from '@/app/gameResult';
import { useGame } from '@/hooks/useGame';
import { websocketService } from '../../services/websocketService';
import { soundService } from '../../services/soundService';

jest.mock('@/hooks/useGame');

jest.mock('../../hooks/useResponsiveTheme', () => ({
    useResponsiveTheme: () => ({
        size: { cardWidth: 50 },
    }),
}));
jest.mock('../../components/models/button', () => {
    const React = require('react');
    const { Pressable, Text } = require('react-native');

    return {
        ButtonView: ({ text, onPress }: any) => (
            <Pressable onPress={onPress}>
                <Text>{text}</Text>
            </Pressable>
        ),
    };
});

jest.mock('../../services/websocketService', () => ({
    websocketService: {
        send: jest.fn(),
    },
}));

jest.mock('../../services/soundService', () => ({
    soundService: {
        play: jest.fn(),
    },
}));

jest.mock('../../components/models/discardPile', () => ({
    DiscardPileView: () => null,
}));

jest.mock('../../components/models/card', () => ({
    CardView: () => null,
}));

jest.mock('../../components/models/iconText', () => ({
    IconText: () => null,
}));

describe('GameResult', () => {
    const baseState = {
        lives: 3,
        shuriken: 1,
        winLevel: 10,
        level: { number: 5 },
        shurikenedCards: [],
        lastRemovedCards: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders win state correctly', () => {
        (useGame as jest.Mock).mockReturnValue({
            state: {
                ...baseState,
                gameOutcome: 'won',
            },
        });

        const { getByText } = render(<GameResult />);

        expect(getByText('YOU WON!')).toBeTruthy();
        expect(getByText('YOU ALL REALLY ARE ONE MIND!')).toBeTruthy();
        expect(soundService.play).toHaveBeenCalledWith('success');
    });

    it('renders lose state correctly', () => {
        (useGame as jest.Mock).mockReturnValue({
            state: {
                ...baseState,
                gameOutcome: 'lost',
            },
        });

        const { getByText } = render(<GameResult />);

        expect(getByText('WOW, YOU LOST.')).toBeTruthy();
        expect(getByText('YOU DEFINITELY COULD HAVE TRIED HARDER BRUH')).toBeTruthy();
        expect(soundService.play).toHaveBeenCalledWith('lose');
    });

    it('shows removed cards section when shurikenedCards exist', () => {
        (useGame as jest.Mock).mockReturnValue({
            state: {
                ...baseState,
                gameOutcome: 'lost',
                shurikenedCards: [{ id: '1', value: 10 }],
            },
        });

        const { getByText } = render(<GameResult />);

        expect(getByText('Removed Cards:')).toBeTruthy();
    });

    it('sends GAME_RESTART when pressing new game', () => {
        (useGame as jest.Mock).mockReturnValue({
            state: {
                ...baseState,
                gameOutcome: 'won',
            },
        });

        const { getByText } = render(<GameResult />);

        fireEvent.press(getByText('NEW GAME?'));

        expect(websocketService.send).toHaveBeenCalledWith({
            type: 'GAME_RESTART',
        });
    });
});