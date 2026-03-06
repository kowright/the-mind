import React, { useState } from "react";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { theme, themeStyles } from "../../theme/theme";
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
    const dynamicShadowStyle = {
        borderRadius: circleShape ?  circleSize / 2 : 6,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 7, // android

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
        //<View style={styles.shadow}>
        <View style={[styles.buttonContainer]}>
            <Pressable onHoverIn={() => setVisible(true)}
                onHoverOut={() => {setVisible(false)}}
        
                onPress={handlePress}
                style={({ pressed, hovered }) => [
                    styles.button,
                    circleShape && dynamicCircleStyle,
                    { backgroundColor: theme.color.button[variant].background },
                    dynamicShadowStyle,
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
                        theme.textShadow,
                        { fontWeight: theme.font.weight.button[variant] },
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
        //</View>
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
    button: {
        //backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        color: theme.colors.textPrimary,
        justifyContent: 'center',
        
    },
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
    shadow: {
        //backgroundColor: '#fff',
        //borderRadius: 99,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        //...Platform.select({
        //    ios: {
        //        shadowColor: 'white',
        //        shadowOffset: { height: 5, width: 5 },
        //        shadowOpacity: 1,
        //        shadowRadius: 1, // Controls the blur radius
        //    },
        //    android: {
        //        elevation: 1, // A higher value results in a larger, lighter shadow
        //        shadowColor: '#000',
        //        shadowOffset: {
        //            width: 0,
        //            height: 2,
        //        },
        //        shadowOpacity: 0.25,
        //        shadowRadius: 3.84,
        //    },
        //}),
    },
});