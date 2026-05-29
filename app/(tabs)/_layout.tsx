import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function tabIcon(name: IoniconsName, focusedName: IoniconsName) {
  return ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
    <Ionicons name={focused ? focusedName : name} size={size} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: tabIcon("home-outline", "home"), }} />
      <Tabs.Screen name="register" options={{ title: "Register", tabBarIcon: tabIcon("add-circle-outline", "add-circle"),}} />
      <Tabs.Screen name="reports" options={{ title: "Reports", tabBarIcon: tabIcon("bar-chart-outline", "bar-chart"), }} />
      <Tabs.Screen name="alerts" options={{ title: "Alerts", tabBarIcon: tabIcon("notifications-outline", "notifications"), }}/>
    </Tabs>
  );
}
