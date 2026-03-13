import React, { useState } from "react";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { theme, themeStyles } from "../../theme/theme";
import { useResponsiveTheme } from "../../hooks/useResponsiveTheme";
import { Platform } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface BaseButtonProps {
    text: string;
    onPress: () => void;
    showTooltip?: boolean;
    disabled?: boolean;
    tooltipText?: string;
    circleShape?: boolean;
    variant: 'primary' | 'secondary';
}

type ButtonProps =
    | (BaseButtonProps & {
        iconName: string;
        iconColor: string;
    })
    | (BaseButtonProps & {
        iconName?: undefined;
        iconColor?: undefined;
    });

export function ButtonView({ text, onPress, tooltipText = '', disabled = false, showTooltip = false, circleShape = false, variant = 'primary', iconName='', iconColor=''}: ButtonProps) {
    const [visible, setVisible] = useState(false);
    const theme = useResponsiveTheme();
  
    const circleSize = theme.size.circleSize;
    const dynamicCircleStyle = {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
    };
    const dynamicShadowStyle = {
        borderRadius: circleShape ? circleSize / 2 : 6,
        ...theme.shadow,
    }
    const dynamicTooltipStyle = circleShape
        ? { bottom: circleSize + 12 }
        : null;

    const dynamicTextStyle = circleShape
        ? {fontSize: themeStyles.heading.fontSize }
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
        <View style={[styles.buttonContainer]}>
            <Pressable onHoverIn={() => setVisible(true)}
                onHoverOut={() => {setVisible(false)}}
        
                onPress={handlePress}
                style={({ pressed, hovered }) => [
                    styles.button,
                    circleShape && dynamicCircleStyle,
                    { backgroundColor: theme.color.button[variant].backgroundColor },
                    dynamicShadowStyle,
                    disabled && styles.disabled,
                    disabled && { backgroundColor: theme.color.button[variant].disabled },
                    hovered && !disabled && { backgroundColor: theme.color.button[variant].hover },
                    pressed && !disabled && { backgroundColor: theme.color.button[variant].pressed },
                ]}
            >
                {iconName ?

                    <IconSymbol name={iconName} color={iconColor} />
                    :
                    <Text
                    style={[
                        styles.buttonText,
                        { color: theme.color.button[variant].text },
                        circleShape && dynamicTextStyle,
                        disabled && styles.disabledText,
                        theme.textShadow,
                        { fontWeight: theme.font.weight.button[variant] },
                    ]}
                >
                    {text}</Text> 
               }
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
        opacity: theme.opacity.disabled,
    },
    disabledText: {
        fontWeight: 'normal',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: theme.border.radius.button,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        ...themeStyles.body,
        textAlign: 'center',
    },
    tooltip: {
        position: 'absolute',
        bottom: 45,
        backgroundColor: theme.color.tooltip.backgroundColor,
        padding: 8,
        borderRadius: theme.border.radius.tooltip,
    },
    tooltipText: {
        color: theme.color.tooltip.text,
    },
});