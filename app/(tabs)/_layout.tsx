

import { usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }



export default function TabLayout() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
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
        name="patient"
        options={({ route }) => ({
          title: 'Patient',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarStyle: {
            display: pathname === '/patient/call' ? 'none' : 'flex'
          }
        })}
      />
      

      <Tabs.Screen
        name="control/control"
        options={{
          title: 'control',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cog' : 'cog-outline'} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}