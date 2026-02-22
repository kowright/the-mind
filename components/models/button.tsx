import React, { useState } from "react";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { theme } from "../../theme/theme";

interface ButtonProps {
    text: string;
    onPress: () => void;
    showTooltip?: boolean;
    disabled?: boolean;
    tooltipText?: string;
    circleShape?: boolean;
}

export function ButtonView({ text, onPress, tooltipText = '', disabled = false, showTooltip = false, circleShape = false }: ButtonProps) {
    const [visible, setVisible] = useState(false);

    const handlePress = () => {
        if (disabled) return;
        onPress();
    };

    const buttonShape = circleShape ? 
        [
            styles.button,
            styles.buttonCircle,
            disabled && styles.disabled
        ] : 
        [
            styles.button,
            disabled && styles.disabled
        ]
    const buttonText = circleShape ?
        [
            styles.buttonText,
            styles.buttonCircleText,
            disabled && styles.disabledText
        ] :
        [
            styles.buttonText,
            disabled && styles.disabled
        ]
    const tooltip = circleShape ? 
        [
            styles.tooltip,
            styles.tooltipCircle
        ] :
        styles.tooltip


    return (
        <View style={styles.buttonContainer}>
            <Pressable onHoverIn={() => setVisible(v => !v)}
                onHoverOut={() => setVisible(v => !v)}
                style={buttonShape}
                onPress={handlePress}
            >
                <Text style={buttonText}>{text}</Text>
            </Pressable>

            {visible && showTooltip && (
                <View style={tooltip}>
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
    disabledText: {
        fontWeight: 'normal',
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
        bottom: 45,
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 6,
    },
    tooltipCircle: {
        bottom: 412,
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