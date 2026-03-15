import React from 'react';
import { render } from '@testing-library/react-native';
import PlayView from '@/app/play';
import { useGame } from '@/hooks/useGame';

jest.mock('@/hooks/useGame');
jest.mock('@/hooks/useCountdown', () => ({
    useCountdown: () => 5,
}));

// Mock phase components
jest.mock('@/components/phases/mistake', () => ({
    MistakeView: () => <></>,
}));

jest.mock('@/components/phases/gamePlayView', () => ({
    GameplayView: () => <></>,
}));

jest.mock('@/components/phases/transition', () => ({
    TransitionView: () => <></>,
}));

jest.mock('@/components/phases/levelResult', () => ({
    LevelResultView: () => <></>,
}));

jest.mock('@/components/phases/shuriken', () => ({
    ShurikenView: () => <></>,
}));

jest.mock('@/components/phases/error', () => ({
    ErrorView: () => <></>,
}));

jest.mock('@/components/phases/pause', () => ({
    PauseView: () => <></>,
}));

jest.mock('@/components/models/gameOverlay', () => ({
    GameOverlayView: ({ children }: any) => <>{children}</>,
}));

describe('PlayView', () => {
    const baseState = {
        players: [{ id: '1', name: 'Alice' }],
        gamePhase: 'startLevel',
        readyToStartPlayers: [],
        paused: false,
        errorMessage: '',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders player name', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: baseState,
        });

        const { getByText } = render(<PlayView />);

        expect(getByText('Alice')).toBeTruthy();
    });

    it('renders mistake phase', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: {
                ...baseState,
                gamePhase: 'mistake',
            },
        });

        const { UNSAFE_queryByType } = render(<PlayView />);

        expect(UNSAFE_queryByType(require('@/components/phases/mistake').MistakeView)).toBeTruthy();
    });

    it('renders shuriken phase', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: {
                ...baseState,
                gamePhase: 'shuriken',
            },
        });

        const { UNSAFE_queryByType } = render(<PlayView />);

        expect(UNSAFE_queryByType(require('@/components/phases/shuriken').ShurikenView)).toBeTruthy();
    });

    it('renders error phase', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: {
                ...baseState,
                gamePhase: 'error',
                errorMessage: 'Something broke',
            },
        });

        const { UNSAFE_queryByType } = render(<PlayView />);

        expect(UNSAFE_queryByType(require('@/components/phases/error').ErrorView)).toBeTruthy();
    });

    it('renders pause view when paused', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: {
                ...baseState,
                gamePhase: 'pause',
                paused: true,
            },
        });

        const { UNSAFE_queryByType } = render(<PlayView />);

        expect(UNSAFE_queryByType(require('@/components/phases/pause').PauseView)).toBeTruthy();
    });

    it('renders level result overlay', () => {
        (useGame as jest.Mock).mockReturnValue({
            playerId: '1',
            state: {
                ...baseState,
                gamePhase: 'levelComplete',
                readyToStartPlayers: [],
            },
        });

        const { UNSAFE_queryByType } = render(<PlayView />);

        expect(
            UNSAFE_queryByType(require('@/components/phases/levelResult').LevelResultView)
        ).toBeTruthy();
    });
});