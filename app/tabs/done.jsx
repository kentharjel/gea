import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSchoolSched } from "../../hooks/useSchoolSched";

export default function DoneScreen() {
  const { tasks, toggleTask } = useSchoolSched();

  // ✅ Only show "done" tasks
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✅ Completed Tasks</Text>

      <FlatList
        data={doneTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity onPress={() => toggleTask(item.id, item.status)}>
              <Ionicons name="checkbox" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.taskText}>{item.text}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  list: {
    marginTop: 10,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    textDecorationLine: "line-through",
  },
});
