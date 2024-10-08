import { Tabs } from 'expo-router';
import React from 'react';

import { Icon, TabBarUpgrade } from '@/src/components/Icon';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import UpgradeStack from './upgrade';

const TabLayout = () => {
  const backgroundColor = useThemeColor("primary");
  const tint = useThemeColor("text");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor },
        tabBarActiveTintColor: tint,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'stats-chart' : 'stats-chart-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="upgrade"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabBarUpgrade 
              name={focused ? 'add' : 'add-outline'}
              backgroundColor={backgroundColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'notifications' : 'notifications-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;