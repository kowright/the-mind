
jest.mock('expo-av', () => ({
    Audio: {
        Sound: jest.fn().mockImplementation(() => ({
            loadAsync: jest.fn(),
            playAsync: jest.fn(),
            stopAsync: jest.fn(),
            unloadAsync: jest.fn(),
            setOnPlaybackStatusUpdate: jest.fn(),
        })),
    },
}));
