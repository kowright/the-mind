import React, { useState } from "react";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { theme } from "../../theme/theme";

interface ButtonProps {
    text: string;
    //button shape/size
    onPress: () => void;
    showTooltip?: boolean;
    disabled?: boolean;
    tooltipText?: string;
}

export function ButtonView({ text, onPress, tooltipText = '', disabled = false, showTooltip = false }: ButtonProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.buttonContainer}>
            <Pressable onHoverIn={() => setVisible(v => !v)}
                onHoverOut={() => setVisible(v => !v)}
                style={disabled ? styles.button && styles.disabled : styles.button}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>

            {visible && showTooltip && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                        {tooltipText}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        maxWidth: '50%',
    },
    disabled: {
        backgroundColor: '#aaa',
        opacity: 0.5,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        color: theme.colors.textPrimary,
    },
    buttonHovered: {
        backgroundColor: theme.colors.hover,
    },
    buttonText: {
        color: 'white',
        fontWeight: 500,
    },
    tooltip: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 6,
    },
    tooltipText: {
        color: 'white',
    },
    buttonCircle: {
        height: 400,
        width: 400,
        borderRadius: 200,
        justifyContent: 'center',
    },
    buttonCircleText: {
        fontSize: 48,
        textAlign: 'center',
    }
});