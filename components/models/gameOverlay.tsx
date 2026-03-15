import { View, StyleSheet } from 'react-native';

interface OverlayProps {
    children: React.ReactNode;
}

export function GameOverlayView({ children }: OverlayProps) {

    return (
        <View style={styles.overlay}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        paddingHorizontal: 16,
        zIndex: 999,
    },
});