import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { mockCategories } from "../mocks/mockData";
import { useFinanceStore } from "../store/financeStore";

export default function ReportsScreen() {
  const { expenses, incomes, loadAll } = useFinanceStore();

  useEffect(() => {
    loadAll();
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

  const categorySummary = mockCategories
    .filter((c) => c.type === 1)
    .map((cat) => {
      const total = expenses
        .filter((e) => e.categoryId === cat.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return { name: cat.name, total };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);

  const now = new Date();
  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{monthLabel}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Income</Text>
        <Text style={[styles.cardValue, { color: "#2e7d32" }]}>
          R$ {totalIncome.toFixed(2)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Expenses</Text>
        <Text style={[styles.cardValue, { color: "#c62828" }]}>
          R$ {totalExpenses.toFixed(2)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Balance</Text>
        <Text
          style={[
            styles.cardValue,
            { color: totalIncome - totalExpenses >= 0 ? "#2e7d32" : "#c62828" },
          ]}
        >
          R$ {(totalIncome - totalExpenses).toFixed(2)}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Expenses by Category</Text>

      {categorySummary.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No expenses to display.</Text>
        </View>
      ) : (
        categorySummary.map((item) => {
          const percentage = totalExpenses > 0 ? (item.total / totalExpenses) * 100 : 0;
          return (
            <View key={item.name} style={styles.categoryRow}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryAmount}>R$ {item.total.toFixed(2)}</Text>
              </View>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        })
      )}
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
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 8,
  },
  categoryRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  categoryAmount: {
    fontSize: 14,
    color: "#c62828",
    fontWeight: "600",
  },
  barBackground: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
  },
  barFill: {
    height: 6,
    backgroundColor: "#2e7d32",
    borderRadius: 3,
  },
  empty: {
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    fontSize: 14,
    color: "#bbb",
  },
});
