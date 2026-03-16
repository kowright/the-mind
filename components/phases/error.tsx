import { Text } from 'react-native';

interface ErrorProps {
}

export function ErrorView() {

    return (
        <>
            <Text>You do not have enough players.</Text>
            <Text>Going to restart game now.</Text>
        </>
    );
}