import React, { useState } from "react";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { theme } from "../../theme/theme";
import { useResponsiveTheme } from "../../hooks/useResponsiveTheme";
import { Platform } from 'react-native';
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
    const theme = useResponsiveTheme();

    const circleSize = theme.size.circleSize;
    const dynamicCircleStyle = {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
    };
    const dynamicTooltipStyle = circleShape
        ? { bottom: circleSize + 12 }
        : null;
    const dynamicTextStyle = circleShape
        ? { fontSize: theme.typography.heading }
        : null;

    const handlePress = () => {
        if (disabled) {
            if (Platform.OS !== 'web') {
                showTemporaryTooltip();
            }
            return;
        }

        onPress();
    };

    const tooltip = circleShape ? 
        [
            styles.tooltip,
            dynamicTooltipStyle
        ] :
        styles.tooltip

    const showTemporaryTooltip = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 1500);
    };


    return (
        <View style={styles.buttonContainer}>
            <Pressable onHoverIn={() => setVisible(true)}
        
                onPress={handlePress}
                style={({ pressed, hovered }) => [
                    styles.button,
                    circleShape && dynamicCircleStyle,
                    disabled && styles.disabled,
                    hovered && !disabled && styles.buttonHovered,
                    pressed && !disabled && styles.buttonPressed,
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        circleShape && dynamicTextStyle,
                        disabled && styles.disabledText,
                    ]}
                >
                    {text}</Text>
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
        maxWidth: '75%',
    },
    disabled: {
        backgroundColor: theme.colors.disabled,
        opacity: theme.opacity.disabled,
    },
    disabledText: {
        fontWeight: theme.fontWeight.normal,
    },
    disabledHovered: {
        backgroundColor: 'purple' // TODO
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: theme.border.radius.sm,
        alignItems: 'center',
        color: theme.colors.textPrimary,
        justifyContent: 'center'
    },
    buttonHovered: {
        backgroundColor: theme.colors.hover,
    },
    buttonPressed: {
        backgroundColor: 'yellow', // TODO 
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.normal,
        textAlign: 'center',
    },
    tooltip: {
        position: 'absolute',
        bottom: 45,
        backgroundColor: 'black',
        padding: 8,
        borderRadius: theme.border.radius.sm,
    },
    tooltipText: {
        color: theme.colors.textPrimary,
    },
});