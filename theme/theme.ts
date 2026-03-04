const tokens = {
    // raw values
    colors: {
        blue: {
            300: '#8DABEC',
            500: '#194298',
            700: '#0A1A3D'
        },
        orange: {
            300: '#f9c78b',
            500: '#F49320',
            700: '#b56709',
        },
        red: {
            500: '#FF3B30',
        },
        gray: {
            400: '#AAA',
        },
        white: '#FFF',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },

    typography: {
        small: 12,
        body: 16,
        heading: 28,
        title: 32,
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
        }, 
        size: {
            small: 12,
            body: 16,
            heading: 28,
            title: 32,
        }
    },

    opacity: {
        50: 0.5,
        70: 0.7,
    },

    size: {
        400: 400,
    },

    radius: {
        sm: 6,
        md: 12,
        lg: 16,
        round: 999,
    },
};
// TODO: fill this out- should separate raw values from semantics in theme? 

export const theme = {
    // semantic meaning of raw values
    colors: {
        background: 'white',
        primary: '#194298',
        secondary: '#F49320',
        textPrimary: 'white',
        error: 'red',
        disabled: '#aaa',
        hover: '#8DABEC', //light 
        pressed: '#0A1A3D', // dark blue
    },

    color: {
        button: {
            primary: {
                background: tokens.colors.blue[500],
                text: tokens.colors.white,
                hover: tokens.colors.blue[300],
                pressed: tokens.colors.blue[700],
                disabled: tokens.colors.gray[400],
                radius: tokens.radius.sm,
            }, 
            secondary: {
                background: tokens.colors.orange[500],
                text: tokens.colors.white,
                hover: tokens.colors.orange[300],
                pressed: tokens.colors.orange[700],
                disabled: tokens.colors.gray[400],
                radius: tokens.radius.sm,
            }
        },

        tooltip: {
            background: tokens.colors.orange[500],
            text: tokens.colors.white,
        },

        nameInput: {
            borderColor: tokens.colors.orange[500],
            text: tokens.colors.white,
        },

        card: {
            primary: {

            },
            discard: {
                
            }
        },

        menuIcon: {

        },

        gameplayIcon: {
            backgroundColor: tokens.colors.white,
            text: tokens.colors.white,
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

    typography: {
        //TODO: should be the line weight, font weight, letter spacing, font size
        small: 12,
        body: 16,
        heading: 28,
        title: 32,
    },


    size: {
        circleSize: tokens.size[400],
        //iconSize
    },

    font: {
        weight: {
            normal: tokens.font.weight.normal,
        }
    },

    opacity: {
        disabled: tokens.opacity[50],
        overlay: tokens.opacity[70]
    }
};

