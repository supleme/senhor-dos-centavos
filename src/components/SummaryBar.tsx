// TODO (sprint-1): implement summary bar component
import { StyleSheet, Text, View } from "react-native";

interface Props {
  totalIncome: number;
  totalExpenses: number;
}

export default function SummaryBar({ totalIncome, totalExpenses }: Props) {
  const balance = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance</Text>
      <Text style={[styles.value, { color: balance >= 0 ? "#2e7d32" : "#c62828" }]}>
        R$ {balance.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
