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

        console.log("dynamuc text style", dynamicTextStyle)

    const handlePress = () => {
        if (disabled) {
            if (Platform.OS !== 'web') {
                showTemporaryTooltip();
            }
            return;
        }

        onPress();
    };

    const buttonShape = circleShape ? 
        [
            styles.button,
            circleShape && dynamicCircleStyle,
            disabled && styles.disabled,
            visible && styles.disabledHovered,
        ] : 
        [
            styles.button,
            disabled && styles.disabled,
            visible && styles.disabledHovered,
        ]
    const buttonText = circleShape ?
        [
            styles.buttonText,
            circleShape && dynamicTextStyle,
            disabled && styles.disabledText,

        ] :
        [
            styles.buttonText,
            disabled && styles.disabled,
 
        ]
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
                onHoverOut={() => setVisible(false)}
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
    buttonCircleText: {
        //fontSize: theme.typography.heading,
        //textAlign: 'center',
    }
});