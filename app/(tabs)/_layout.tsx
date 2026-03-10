import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { theme } from '../../theme/theme';
import { useGame } from '../../hooks/useGame';
import { hasValidPlayerCount, allPlayersHaveNames } from '@/shared/utils/utils';
import { Text, View, TextInput } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const { state, playerId } = useGame();

    const playersHaveNames = allPlayersHaveNames(state.players);


    const isValidPlayerCount = hasValidPlayerCount(state.players);

    const readyToPlay = playersHaveNames && isValidPlayerCount;
    console.log('ready ', readyToPlay)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.color.menuIcon.backgroundColor,
        headerShown: false,
              tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
            tabBarIcon: ({ color }) =>
                <View style={{}}>
                    <IconSymbol size={28} name="house.fill" color={readyToPlay ? 'orange' : color} />
              
                </View>
            ,
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: 'Rules',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
          />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
                tabBarIcon: ({ color }) =>
           
                        <IconSymbol size={28} name="gearshape.fill" color={color} /> 
  
                ,
            }}
        />
    </Tabs>
  );
}
