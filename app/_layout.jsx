import { Stack } from "expo-router";
import SchoolSchedProvider from "../contexts/schooSched";

export default function RootLayout() {
  return(
    <SchoolSchedProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="signup" options={{ headerShown: false}}/>
        <Stack.Screen name="tabs" options={{ headerShown: false}}/>
      </Stack>
    </SchoolSchedProvider>
  )
}
