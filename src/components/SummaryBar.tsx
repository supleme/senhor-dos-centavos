import { StyleSheet, Text, View } from "react-native";

interface Props {
  totalIncome: number;
  totalExpenses: number;
}

export default function SummaryBar({ totalIncome, totalExpenses }: Props) {
  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Income</Text>
        <Text style={[styles.value, { color: "#2e7d32" }]}>
          R$ {totalIncome.toFixed(2)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={[styles.value, { color: "#c62828" }]}>
          R$ {totalExpenses.toFixed(2)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.label}>Balance</Text>
        <Text style={[styles.value, { color: isPositive ? "#2e7d32" : "#c62828" }]}>
          R$ {balance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    backgroundColor: "#eee",
    marginVertical: 2,
  },
});
