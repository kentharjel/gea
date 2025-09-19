import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSchoolSched } from "../../hooks/useSchoolSched";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const { user, tasks, addTask, fetchTasks, toggleTask } = useSchoolSched();

  // ✅ Fetch tasks on mount if user is logged in
  useEffect(() => {
    if (user) {
      fetchTasks(user.id);
    }
  }, [user]);

  const handleAddTask = async () => {
    if (task.trim() === "") return;
    try {
      await addTask(task); // saves to Firestore and updates context
      setTask(""); // clear input
      Keyboard.dismiss()
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Only show "todo" tasks
  const todoTasks = tasks.filter((t) => t.status === "todo");

  return (
    <View style={styles.container}>
      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Add task..."
        value={task}
        onChangeText={setTask}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>➕ Add Task</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        data={todoTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity onPress={() => toggleTask(item.id, item.status)}>
              <Ionicons
                name={item.status === "done" ? "checkbox" : "square-outline"}
                size={24}
                color={item.status === "done" ? "#4CAF50" : "#888"}
              />
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
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  },
});
