import { Text } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';

interface ErrorProps {
}

export function ErrorView() {
    //TODO: put white background and all that stuff on it 
    return (
        <>
            <GameOverlayView>
                <Text>You do not have enough players.</Text>
                <Text>Going to restart game now.</Text>
            </GameOverlayView>
        </>
    );
}