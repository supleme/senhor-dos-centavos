import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseCard from "../components/ExpenseCard";
import SummaryBar from "../components/SummaryBar";
import { mockCategories, mockExpenses, mockIncomes } from "../mocks/mockData";

const totalIncome = mockIncomes.reduce((sum, i) => sum + i.amount, 0);
const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>May 2025</Text>
      <SummaryBar totalIncome={totalIncome} totalExpenses={totalExpenses} />
      <Text style={styles.sectionTitle}>Recent Expenses</Text>
      <FlatList
        data={mockExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            category={mockCategories.find((c) => c.id === item.categoryId)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
});
