import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
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

export default function RootLayout() {
  const loadAll = useFinanceStore((state) => state.loadAll);

  useEffect(() => {
    initDatabase();
    loadAll();
    requestNotificationPermissions();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
