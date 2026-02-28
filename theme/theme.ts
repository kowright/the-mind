export const theme = {
    colors: {
        background: 'white',
        primary: '#194298',
        secondary: '#F49320',
        textPrimary: 'white',
        error: '#red',
        disabled: '#aaa',
        hover: 'pink', //TODO
        pressed: '#0A1A3D',
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

    radius: {
        sm: 6,
        md: 12,
        lg: 16,
        round: 999,
    },

    border: {
        radius: {
            sm: 6,
        }  
    },

    size: {
        circleSize: 400,
    },

    fontWeight: {
        normal: "500" as const, // use as const for the union type, not a generic string
    },

    opacity: {
        disabled: 0.5,
    }
};
