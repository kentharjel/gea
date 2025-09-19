import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../firebaseConfig";

export const SchoolSched = createContext();

export default function SchoolSchedProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  // 🔹 Create Account
  async function createAccount(accountData) {
    await addDoc(collection(db, "Accounts"), accountData);
  }

  // 🔹 Sign In
  async function signIn(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required!");
    }

    const q = query(
      collection(db, "Accounts"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Invalid email or password!");
    }

    const userData = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
    setUser(userData);

    // Fetch this user's tasks
    await fetchTasks(userData.id);

    return userData;
  }

  // 🔹 Add Task
  async function addTask(taskText) {
    if (!user) throw new Error("User not logged in!");

    const taskData = {
      text: taskText,
      userId: user.id,
      status: "todo",
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "Tasks"), taskData);
    setTasks((prev) => [...prev, { id: docRef.id, ...taskData }]);
  }

  // 🔹 Fetch Tasks
  async function fetchTasks(userId) {
    const q = query(collection(db, "Tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(userTasks);
  }

  // 🔹 Toggle Task Status (todo <-> done)
  async function toggleTask(taskId, currentStatus) {
    try {
      const newStatus = currentStatus === "done" ? "todo" : "done";

      // Update Firestore
      const taskRef = doc(db, "Tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });

      // Update local state
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  }

  async function editTask(taskId, newText) {
  const taskRef = doc(db, "Tasks", taskId);
  await updateDoc(taskRef, { text: newText });
  setTasks(prev =>
    prev.map(t => (t.id === taskId ? { ...t, text: newText } : t))
  );
}

// 🔹 Delete Task
async function deleteTask(taskId) {
  const taskRef = doc(db, "Tasks", taskId);
  await deleteDoc(taskRef);
  setTasks(prev => prev.filter(t => t.id !== taskId));
}

  // 🔹 Logout
  function logout() {
    setUser(null);
    setTasks([]); // clear tasks when logging out
    router.push("/");
  }

  return (
    <SchoolSched.Provider
      value={{
        user,
        tasks,
        createAccount,
        signIn,
        addTask,
        fetchTasks,
        toggleTask, // ✅ exposed merged version
        logout,
        editTask,
        deleteTask
      }}
    >
      {children}
    </SchoolSched.Provider>
  );
}
