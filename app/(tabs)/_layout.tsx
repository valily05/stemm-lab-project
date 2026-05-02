import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="homescreen" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}