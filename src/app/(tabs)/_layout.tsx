import { Tabs } from 'expo-router';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Icon, TabBarUpgrade } from '../../components/Icon';

const TabLayout = () => {
  const backgroundColor = useThemeColor("primary");
  const tintActive = useThemeColor("text");
  const tintInactive = useThemeColor("textSecondary");

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor },
      tabBarActiveTintColor: tintActive,
      tabBarInactiveTintColor: tintInactive,
      tabBarHideOnKeyboard: true
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
        name="add"
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