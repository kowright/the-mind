export type GameSettings = Record<GameSetting, boolean>;

export type GameSetting = 'skippedCards' | 'cardCounts' | 'oneLife' | 'blind';

export const initialGameSettings = {
    skippedCards: false,
    cardCounts: false,
    oneLife: false,
    blind: false,
} as GameSettings;

