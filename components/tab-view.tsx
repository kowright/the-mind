import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

type TabViewProps = {
    children: ReactNode;
};

export function TabView({ children }: TabViewProps) {
    return (
        <View style={styles.background}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white', // temporary to confirm it's rendering
        flex: 1,
        marginTop: 36,
    },
});
