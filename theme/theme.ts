import { StyleSheet } from 'react-native';

const tokens = {
    // raw values
    colors: {
        blue: {
            100: '#bbcdf4',
            200: '#0049DB',
            300: '#8DABEC',
            400: '#1f305e',
            500: '#194298', //primary
            700: '#0A1A3D'
        },
        orange: {
            300: '#f9c78b',
            500: '#f4982a',
            700: '#b56709',
        },
        red: {
            400: '#ff0800',
            500: '#FF3B30',
        },
        gray: {
            400: '#AAA',
        },
        green: {
            300: '#09b500',
        },
        white: '#FFF',
        black: '#000',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },

    border: {
        radius: {
            sm: 6,
            md: 12,
            lg: 16,
            round: 999,
        }
    },

    font: {
        weight: {
            normal: "500" as const, // use as const for the union type, not a generic string
            bold: "700" as const,
            //normal: 500,
            //bold: 700,
        }, 
        size: {
            sm: 12,
            md: 16,
            lg: 28,
            xl: 32,
        }
    },

    opacity: {
        50: 0.5,
        70: 0.7,
    },

    size: {
        400: 400,
    },
};

export const theme = {
    // semantic meaning of raw values
    color: {
        brand: {
            primary: tokens.colors.orange[500],
        },

        button: {
            primary: {
                backgroundColor: tokens.colors.orange[500],
                text: tokens.colors.white,
                hover: tokens.colors.orange[300],
                pressed: tokens.colors.orange[700],
                disabled: tokens.colors.gray[400],
            },
            secondary: {
                backgroundColor: tokens.colors.blue[500],
                text: tokens.colors.white,
                hover: tokens.colors.blue[100],
                pressed: tokens.colors.blue[700],
                disabled: tokens.colors.gray[400],
            },

        },

        tooltip: {
            backgroundColor: tokens.colors.orange[500],
            text: tokens.colors.white,
        },

        nameInput: {
            borderColor: tokens.colors.orange[500],
            text: tokens.colors.white,
        },

        card: {
            primary: tokens.colors.black,
            mistake: tokens.colors.red[400], 
            gradient: {
                blueGradient: [tokens.colors.blue[300], 'white', 'white', 'white', tokens.colors.blue[300]],
                orangeGradient: [tokens.colors.orange[300], 'transparent', 'transparent', 'transparent', tokens.colors.orange[300]],
            }
        },

        menuIcon: {
            backgroundColor: tokens.colors.blue[500],
        },

        gameplayIcon: {
            backgroundColor: tokens.colors.white,
        },
        gameBackground: {
            // backgroundColor: '#96725c', // mid orange
            //backgroundColor: '#5c7296', // mid blue
            // backgroundColor: '#9a9faf', // gray blue
            backgroundColor: tokens.colors.blue[400],
            gradient: [
                tokens.colors.blue[700],
                tokens.colors.blue[700],
                tokens.colors.orange[700],
                tokens.colors.orange[700],
            ]
        },
        overlay: {
            backgroundColor: tokens.colors.blue[400],
            color: tokens.colors.white,
            alert: tokens.colors.red[400],
        },

        text: {
            heading: tokens.colors.white,
            body: tokens.colors.white,
            small: tokens.colors.white,
        },
        gameResult: {
            win: tokens.colors.green[300],
            lose: tokens.colors.red[400],
        }
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },

    size: {
        circleSize: tokens.size[400],
        //iconSize
    },

    font: {
        weight: {
            normal: tokens.font.weight.normal,
            bold: tokens.font.weight.bold,
            button: {
                primary: tokens.font.weight.bold,
                secondary: tokens.font.weight.normal,
            }
        },
        size: {
            title: tokens.font.size.xl,
            heading: tokens.font.size.lg,
            body: tokens.font.size.md,
            small: tokens.font.size.sm,
        }
    },

    opacity: {
        disabled: tokens.opacity[50],
        overlay: tokens.opacity[70]
    },

    border: {
        radius: {
            overlay: tokens.border.radius.lg,
            button: tokens.border.radius.sm,
            tooltip: tokens.border.radius.sm,
        }
    },
    textShadow: {
        textShadowColor: tokens.colors.black,
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
    },
    shadow: {
        shadowColor: tokens.colors.black,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 7, // android
    },
};

export type Theme = typeof theme; 

// styles

export const overlayStyle = (theme: Theme) => ({
    backgroundColor: theme.color.overlay.backgroundColor,
    borderRadius: theme.border.radius.overlay,
    padding: theme.spacing.lg,

});


export const themeStyles = StyleSheet.create({
    title: {
        ...theme.textShadow,
        fontSize: theme.font.size.title,
        color: theme.color.brand.primary,
    },
    heading: {
        ...theme.textShadow,
        fontSize: theme.font.size.heading,
        color: theme.color.text.heading,
        fontWeight: theme.font.weight.bold,
    },
    body: {
        ...theme.textShadow,
        fontSize: theme.font.size.body,
        color: theme.color.text.body,
    },
    small: {
        ...theme.textShadow,
        fontSize: theme.font.size.small,
        color: theme.color.text.small,
    },

});