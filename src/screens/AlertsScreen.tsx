import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mockCategories } from "../mocks/mockData";
import { sendMonthlySummary } from "../services/notifications";
import { useFinanceStore } from "../store/financeStore";

export default function AlertsScreen() {
  const { expenses, incomes, loadAll } = useFinanceStore();

  useEffect(() => {
    loadAll();
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;
  const isNegative = balance < 0;

  const topCategory = mockCategories
    .filter((c) => c.type === 1)
    .map((cat) => ({
      name: cat.name,
      total: expenses
        .filter((e) => e.categoryId === cat.id)
        .reduce((sum, e) => sum + e.amount, 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)[0] ?? null;

  async function handleCheckAlerts() {
    await sendMonthlySummary(balance, topCategory?.name ?? null);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Alerts</Text>

      <View style={[styles.card, isNegative ? styles.cardDanger : styles.cardOk]}>
        <View style={styles.cardRow}>
          <Ionicons
            name={isNegative ? "warning-outline" : "checkmark-circle-outline"}
            size={24}
            color={isNegative ? "#c62828" : "#2e7d32"}
          />
          <Text style={[styles.cardTitle, { color: isNegative ? "#c62828" : "#2e7d32" }]}>
            {isNegative ? "Negative Balance" : "Balance OK"}
          </Text>
        </View>
        <Text style={styles.cardValue}>
          R$ {balance.toFixed(2)}
        </Text>
        <Text style={styles.cardSub}>
          {isNegative
            ? "Your expenses exceed your income this month."
            : "Your spending is within your income this month."}
        </Text>
      </View>

      {topCategory && (
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="bar-chart-outline" size={24} color="#1565c0" />
            <Text style={[styles.cardTitle, { color: "#1565c0" }]}>Top Spending Category</Text>
          </View>
          <Text style={styles.cardValue}>{topCategory.name}</Text>
          <Text style={styles.cardSub}>R$ {topCategory.total.toFixed(2)} spent this month</Text>
        </View>
      )}

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Ionicons name="wallet-outline" size={24} color="#555" />
          <Text style={[styles.cardTitle, { color: "#555" }]}>Monthly Overview</Text>
        </View>
        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Income</Text>
          <Text style={[styles.overviewValue, { color: "#2e7d32" }]}>
            R$ {totalIncome.toFixed(2)}
          </Text>
        </View>
        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Expenses</Text>
          <Text style={[styles.overviewValue, { color: "#c62828" }]}>
            R$ {totalExpenses.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.overviewRow, styles.overviewTotal]}>
          <Text style={styles.overviewLabel}>Remaining</Text>
          <Text style={[styles.overviewValue, { color: isNegative ? "#c62828" : "#2e7d32" }]}>
            R$ {balance.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCheckAlerts}>
        <Ionicons name="notifications-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Send Summary Notification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    paddingTop: 24,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#e0e0e0",
  },
  cardOk: {
    borderLeftColor: "#2e7d32",
  },
  cardDanger: {
    borderLeftColor: "#c62828",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  cardSub: {
    fontSize: 13,
    color: "#888",
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  overviewTotal: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 4,
    paddingTop: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: "#666",
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
