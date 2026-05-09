// TODO (sprint-1): implement category badge component
import { StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
}

export default function CategoryBadge({ name }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});
