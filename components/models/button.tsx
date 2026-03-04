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
    variant: 'primary' | 'secondary',
}

export function ButtonView({ text, onPress, tooltipText = '', disabled = false, showTooltip = false, circleShape = false, variant = 'primary' }: ButtonProps) {
    const [visible, setVisible] = useState(false);
    const theme = useResponsiveTheme();
  
    const circleSize = theme.size.circleSize;
    const dynamicCircleStyle = {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
    };
    console.log('dynamic circle', dynamicCircleStyle)
    const dynamicTooltipStyle = circleShape
        ? { bottom: circleSize + 12 }
        : null;
        console.log('circle shape', circleShape)
    console.log('button font size', theme.typography.heading)
    const dynamicTextStyle = circleShape
        ? { fontSize: theme.typography.heading }
        : null;
    console.log('button font size', dynamicTextStyle)

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
                onHoverOut={() => {setVisible(false)}}
        
                onPress={handlePress}
                style={({ pressed, hovered }) => [
                    styles.button,
                    circleShape && dynamicCircleStyle,
                    { backgroundColor: theme.color.button[variant].background },
                    disabled && styles.disabled,
                    hovered && !disabled && { backgroundColor: theme.color.button[variant].hover },
                    pressed && !disabled && { backgroundColor: theme.color.button[variant].pressed },
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
                    <Text style={styles.tooltipText} >
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
        opacity: 0.5,
    },
    disabledText: {
        fontWeight: 'normal',
    },
    disabledHovered: {
        backgroundColor: 'purple' // TODO
    },
    button: {
        //backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        color: theme.colors.textPrimary,
        justifyContent: 'center'
    },
    //buttonHovered: {
    //    backgroundColor: theme.colors.hover, 
    //},
    //buttonPressed: {
    //    backgroundColor: 'yellow', // TODO 
    //},
    buttonText: {
        color: theme.colors.textPrimary,
        fontWeight: 'normal',
        textAlign: 'center',
    },
    tooltip: {
        position: 'absolute',
        bottom: 45,
        backgroundColor: theme.color.tooltip.background,
        padding: 8,
        borderRadius: 6,
    },
    tooltipText: {
        color: theme.color.tooltip.text,
    },
});