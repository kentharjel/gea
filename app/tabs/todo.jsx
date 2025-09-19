import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSchoolSched } from "../../hooks/useSchoolSched";

export default function TodoScreen() {
  const { user, tasks, addTask, fetchTasks, toggleTask, editTask, deleteTask } = useSchoolSched();
  const [task, setTask] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    if (user) fetchTasks(user.id);
  }, [user]);

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      await addTask(task);
      setTask("");
      Keyboard.dismiss();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setEditText(task.text);
    setModalVisible(true);
  };

  const handleEdit = async () => {
    if (!selectedTask) return;
    await editTask(selectedTask.id, editText);
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (!selectedTask) return;

    // Show confirmation alert
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTask(selectedTask.id);
            setModalVisible(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Add Schedule..."
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>➕ Add Schedule</Text>
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
              <TouchableOpacity
                onPress={() => openTaskModal(item)}
                style={{ marginLeft: "auto" }}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />

        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Edit Task</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editText}
                    onChangeText={setEditText}
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={handleEdit}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDelete}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: "center",
  },
  cancelButton: {
    marginTop: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
