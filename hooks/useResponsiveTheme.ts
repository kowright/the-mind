import { useWindowDimensions } from 'react-native';
import { theme } from '@/theme/theme';
export function useResponsiveTheme() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;

    const scale50 = isDesktop ? 1.5 : 1; 
    const scale100 = isDesktop ? 2 : 1;

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
      }
  };
}
