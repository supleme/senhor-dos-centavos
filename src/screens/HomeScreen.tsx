import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExpenseCard from "../components/ExpenseCard";
import SummaryBar from "../components/SummaryBar";
import { mockCategories } from "../mocks/mockData";
import { useFinanceStore } from "../store/financeStore";

export default function HomeScreen() {
  const { expenses, incomes, loadAll, removeExpense, removeIncome } = useFinanceStore();

  useEffect(() => {
    loadAll();
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const now = new Date();
  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  function handleDeleteExpense(id: string) {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeExpense(id) },
    ]);
  }

  function handleDeleteIncome(id: number) {
    Alert.alert("Delete Income", "Are you sure you want to delete this income?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeIncome(id) },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{monthLabel}</Text>
      <SummaryBar totalIncome={totalIncome} totalExpenses={totalExpenses} />

      <Text style={styles.sectionTitle}>Recent Expenses</Text>
      {expenses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No expenses registered yet.</Text>
          <Text style={styles.emptyHint}>Use the Register tab to add one.</Text>
        </View>
      ) : (
        expenses.map((item) => (
          <ExpenseCard
            key={item.id}
            expense={item}
            category={mockCategories.find((c) => c.id === item.categoryId)}
            onDelete={() => handleDeleteExpense(item.id)}
          />
        ))
      )}

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Income</Text>
      {incomes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No income registered yet.</Text>
          <Text style={styles.emptyHint}>Use the Register tab to add one.</Text>
        </View>
      ) : (
        incomes.map((item) => {
          const category = mockCategories.find((c) => c.id === item.categoryId);
          const date = new Date(item.date).toLocaleDateString("pt-BR");
          return (
            <View key={item.id} style={styles.incomeCard}>
              <View>
                <Text style={styles.incomeName}>{category?.name ?? "—"}</Text>
                <Text style={styles.incomeDate}>{date}</Text>
              </View>
              <View style={styles.incomeRight}>
                <Text style={styles.incomeAmount}>
                  R$ {item.amount.toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteIncome(item.id)}
                  hitSlop={8}
                >
                  <Ionicons name="trash-outline" size={16} color="#c62828" />
                </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  empty: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    gap: 4,
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  emptyHint: {
    fontSize: 12,
    color: "#bbb",
  },
  incomeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#2e7d32",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  incomeName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  incomeDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  incomeRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  incomeAmount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});
