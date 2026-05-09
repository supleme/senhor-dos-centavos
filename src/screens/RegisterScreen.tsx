import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { mockCategories } from "../mocks/mockData";
import { PaymentType } from "../types";

const PAYMENT_TYPES: PaymentType[] = ["credit", "debit", "pix"];

export default function RegisterScreen() {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(null);

  const expenseCategories = mockCategories.filter((c) => c.type === 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Expense</Text>

      <Text style={styles.label}>Amount (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {expenseCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, selectedCategory === cat.id && styles.chipSelected]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[styles.chipText, selectedCategory === cat.id && styles.chipTextSelected]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Payment Type</Text>
      <View style={styles.row}>
        {PAYMENT_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.chip, selectedPayment === type && styles.chipSelected]}
            onPress={() => setSelectedPayment(type)}
          >
            <Text
              style={[styles.chipText, selectedPayment === type && styles.chipTextSelected]}
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Expense</Text>
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
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  chipSelected: {
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
  chipText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#2e7d32",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
