import { useWindowDimensions } from 'react-native';
import { theme } from '@/theme/theme';
export function useResponsiveTheme() {
  const { width,height } = useWindowDimensions();

  const isDesktop = width >= 1024;

    const scale50 = isDesktop ? 1.5 : 1; 
    const scale100 = isDesktop ? 2 : 1;

    const cardWidth = Math.min(width * 0.25, 220);
    const cardHeight = cardWidth * 1.4;

  return {
    ...theme,
    typography: {
      small: theme.typography.small * scale50,
        body: theme.typography.body * scale50,
        title: theme.typography.title * scale100,
        heading: theme.typography.heading * scale100,
      },

      size: {
          circleSize: Math.min(width * 0.7, 400),
          cardWidth: Math.min(width * 0.25, 200),
          cardHeight,
      }
  };
}
