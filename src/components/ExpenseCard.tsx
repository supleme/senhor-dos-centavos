import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Category, Expense } from "../types";

interface Props {
  expense: Expense;
  category?: Category;
  onDelete?: () => void;
}

const PAYMENT_LABEL: Record<string, string> = {
  credit: "Credit",
  debit: "Debit",
  pix: "PIX",
};

const PAYMENT_COLOR: Record<string, string> = {
  credit: "#1565c0",
  debit: "#2e7d32",
  pix: "#6a1b9a",
};

export default function ExpenseCard({ expense, category, onDelete }: Props) {
  const color = PAYMENT_COLOR[expense.paymentType] ?? "#555";
  const date = new Date(expense.date).toLocaleDateString("pt-BR");

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.category}>{category?.name ?? "—"}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>R$ {expense.amount.toFixed(2)}</Text>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{PAYMENT_LABEL[expense.paymentType]}</Text>
          </View>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} hitSlop={8}>
              <Ionicons name="trash-outline" size={16} color="#c62828" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  left: {
    gap: 4,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  category: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#c62828",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  deleteBtn: {
    padding: 2,
  },
});
