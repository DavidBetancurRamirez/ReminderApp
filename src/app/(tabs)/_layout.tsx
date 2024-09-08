import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon, TabBarUpgrade } from '@/src/components/navigation/TabBarIcon';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const TabLayout = () => {
  const backgroundColor = useThemeColor("primary");
  const tint = useThemeColor("text");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor },
        tabBarActiveTintColor: tint
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upgrade"
        options={{
          title:"",
          tabBarIcon: ({ color, focused }) => (
            <TabBarUpgrade 
              name={focused ? 'add' : 'add-outline'} 
              color={color}
              backgroundColor={backgroundColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;