import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { initDatabase } from "../src/database/database";
import { requestNotificationPermissions } from "../src/services/notifications";
import { useFinanceStore } from "../src/store/financeStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function setupNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2e7d32",
    });
  }
  await requestNotificationPermissions();
}

export default function RootLayout() {
  const loadAll = useFinanceStore((state) => state.loadAll);

  useEffect(() => {
    try {
      initDatabase();
      loadAll();
    } catch (e) {
      console.error("Database initialization failed:", e);
    }
    setupNotifications();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
