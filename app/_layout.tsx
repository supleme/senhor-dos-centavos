import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { initDatabase } from "../src/database/database";
import { requestNotificationPermissions } from "../src/services/notifications";
import { useFinanceStore } from "../src/store/financeStore";

export default function RootLayout() {
  const loadAll = useFinanceStore((state) => state.loadAll);

  useEffect(() => {
    try {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    } catch (e) {
      console.warn("Notification handler setup failed:", e);
    }

    try {
      initDatabase();
      loadAll();
    } catch (e) {
      console.error("Database initialization failed:", e);
    }

    (async () => {
      try {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: 4,
            vibrationPattern: [0, 250, 250, 250],
          });
        }
        await requestNotificationPermissions();
      } catch (e) {
        console.warn("Notification permissions failed:", e);
      }
    })();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
