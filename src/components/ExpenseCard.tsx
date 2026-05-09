// TODO (sprint-1): implement expense/income card component
import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../types";

interface Props {
  expense: Expense;
}

export default function ExpenseCard({ expense }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>R$ {expense.amount.toFixed(2)}</Text>
      <Text style={styles.type}>{expense.paymentType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
    color: "#888",
    textTransform: "capitalize",
  },
});
