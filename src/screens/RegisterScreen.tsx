import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { mockCategories } from "../mocks/mockData";
import { sendNegativeBalanceAlert } from "../services/notifications";
import { useFinanceStore } from "../store/financeStore";
import { PaymentType } from "../types";

type EntryType = "expense" | "income";
const PAYMENT_TYPES: PaymentType[] = ["credit", "debit", "pix"];

function formatCurrency(digits: string): string {
  if (!digits) return "";
  const number = parseInt(digits, 10) / 100;
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function RegisterScreen() {
  const addExpense = useFinanceStore((state) => state.addExpense);
  const addIncome = useFinanceStore((state) => state.addIncome);

  const [entryType, setEntryType] = useState<EntryType>("expense");
  const [rawDigits, setRawDigits] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = mockCategories.filter((c) =>
    entryType === "expense" ? c.type === 1 : c.type === 2
  );

  const numericAmount = rawDigits ? parseInt(rawDigits, 10) / 100 : 0;

  function switchType(type: EntryType) {
    setEntryType(type);
    setSelectedCategory(null);
    setSelectedPayment(null);
    setErrors({});
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!rawDigits || numericAmount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0.";
    }
    if (!selectedCategory) {
      newErrors.category = "Select a category.";
    }
    if (entryType === "expense" && !selectedPayment) {
      newErrors.payment = "Select a payment type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    if (entryType === "expense") {
      addExpense({
        id: Date.now().toString(),
        userId: "user-001",
        categoryId: selectedCategory!,
        amount: numericAmount,
        date: new Date().toISOString(),
        paymentType: selectedPayment!,
      });

      const { expenses, incomes } = useFinanceStore.getState();
      const balance =
        incomes.reduce((sum, i) => sum + i.amount, 0) -
        expenses.reduce((sum, e) => sum + e.amount, 0);
      if (balance < 0) sendNegativeBalanceAlert(balance);
    } else {
      addIncome({
        userId: 1,
        categoryId: selectedCategory!,
        amount: numericAmount,
        date: new Date().toISOString(),
      });
    }

    setRawDigits("");
    setSelectedCategory(null);
    setSelectedPayment(null);
    setErrors({});
    Alert.alert("Success", `${entryType === "expense" ? "Expense" : "Income"} saved successfully!`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Entry</Text>

      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, entryType === "expense" && styles.toggleBtnExpense]}
          onPress={() => switchType("expense")}
        >
          <Text style={[styles.toggleText, entryType === "expense" && styles.toggleTextActive]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, entryType === "income" && styles.toggleBtnIncome]}
          onPress={() => switchType("income")}
        >
          <Text style={[styles.toggleText, entryType === "income" && styles.toggleTextActive]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Amount (R$)</Text>
      <TextInput
        style={[styles.input, errors.amount ? styles.inputError : null]}
        placeholder="0,00"
        keyboardType="numeric"
        value={formatCurrency(rawDigits)}
        onChangeText={(v) => {
          const digits = v.replace(/\D/g, "");
          setRawDigits(digits);
          if (errors.amount) setErrors((e) => ({ ...e, amount: "" }));
        }}
      />
      {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.chip,
              selectedCategory === cat.id &&
                (entryType === "expense" ? styles.chipSelectedExpense : styles.chipSelectedIncome),
            ]}
            onPress={() => {
              setSelectedCategory(cat.id);
              if (errors.category) setErrors((e) => ({ ...e, category: "" }));
            }}
          >
            <Text
              style={[styles.chipText, selectedCategory === cat.id && styles.chipTextSelected]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

      {entryType === "expense" && (
        <>
          <Text style={styles.label}>Payment Type</Text>
          <View style={styles.row}>
            {PAYMENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, selectedPayment === type && styles.chipSelectedExpense]}
                onPress={() => {
                  setSelectedPayment(type);
                  if (errors.payment) setErrors((e) => ({ ...e, payment: "" }));
                }}
              >
                <Text
                  style={[styles.chipText, selectedPayment === type && styles.chipTextSelected]}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.payment ? <Text style={styles.errorText}>{errors.payment}</Text> : null}
        </>
      )}

      <TouchableOpacity
        style={[styles.button, entryType === "income" && styles.buttonIncome]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save {entryType === "expense" ? "Expense" : "Income"}
        </Text>
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
  toggle: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 8,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleBtnExpense: {
    backgroundColor: "#c62828",
  },
  toggleBtnIncome: {
    backgroundColor: "#2e7d32",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  toggleTextActive: {
    color: "#fff",
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
  inputError: {
    borderColor: "#c62828",
  },
  errorText: {
    fontSize: 12,
    color: "#c62828",
    marginTop: 2,
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
  chipSelectedExpense: {
    backgroundColor: "#c62828",
    borderColor: "#c62828",
  },
  chipSelectedIncome: {
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
    backgroundColor: "#c62828",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  buttonIncome: {
    backgroundColor: "#2e7d32",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
