import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSchoolSched } from "../../hooks/useSchoolSched"; // ✅ use context

export default function ProfileScreen() {
  const { user, logout } = useSchoolSched();

  return (
    <View style={styles.container}>
      {/* 🔹 Top-right logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={28} color="#ff4444" />
      </TouchableOpacity>

      <View style={styles.card}>
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/icons/logo.jpeg")}
            style={styles.avatar}
          />
        </View>

        {/* Profile Info */}
        <Text style={styles.name}>{user?.name || "Guest User"}</Text>
        <Text style={styles.email}>{user?.email || "Not signed in"}</Text>

        {/* Extra Details Section */}
        {user && (
          <View style={styles.details}>
            <Text style={styles.label}>Account Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Name</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoutBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  details: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 15,
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoKey: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
  },
});
