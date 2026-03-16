import { useWindowDimensions } from 'react-native';
import { theme, themeStyles } from '@/theme/theme';
export function useResponsiveTheme() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;

    const scale50 = isDesktop ? 1.5 : 1; 
    const scale100 = isDesktop ? 2 : 1;
    
    const cWidth = Math.min(width * 0.3, 100);
    const cardWidth = !isDesktop ? cWidth : cWidth * 1.5 ;
    const cardHeight = cardWidth * 1.5;

  return {
      ...theme,

    typography: {
      small: themeStyles.small.fontSize * scale50,
        body: themeStyles.body.fontSize * scale50,
        title: themeStyles.title.fontSize * scale100,
        heading: themeStyles.heading.fontSize * scale100,
      },

      size: {
          circleSize: Math.min(width * 0.7, 400),
          cardWidth,
          cardHeight,
      },

      spacing: {
          cornerNumberSpacing: 8 * scale50,
      }
  };
}
