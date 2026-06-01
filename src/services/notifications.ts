import * as Notifications from "expo-notifications";

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function sendNegativeBalanceAlert(balance: number): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚠️ Negative Balance",
      body: `Your balance is R$ ${balance.toFixed(2)} this month. Watch your spending!`,
      sound: true,
    },
    trigger: null,
  });
}

export async function sendMonthlySummary(
  balance: number,
  topCategory: string | null
): Promise<void> {
  const balanceLabel = `R$ ${balance.toFixed(2)}`;
  const body = topCategory
    ? `Balance: ${balanceLabel} | Top spending: ${topCategory}`
    : `Balance: ${balanceLabel}`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📊 Monthly Summary",
      body,
      sound: true,
    },
    trigger: null,
  });
}
