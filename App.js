import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import { LeadsProvider } from "./context/LeadsContext";
import FullScreenNotification from "./screens/FullScreenNotification";
import LeadDetails from "./screens/LeadDetails";
import MainScreen from "./screens/MainScreen";
import Task1_OCRScreen from "./screens/Task1_OCRScreen";
import Task2_ChatScreen from "./screens/Task2_ChatScreen";
import Task3_NotificationScreen from "./screens/Task3_NotificationScreen";
import Task4_LocationScreen from "./screens/Task4_LocationScreen";
import Task5_DashboardScreen from "./screens/Task5_DashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <LeadsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: true }}
          >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="Task1_OCR"
              component={Task1_OCRScreen}
              options={{ title: "Task 1 — OCR" }}
            />
            <Stack.Screen
              name="Task2_Chat"
              component={Task2_ChatScreen}
              options={{ title: "Task 2 — AI Chat" }}
            />
            <Stack.Screen
              name="Task3_Notifs"
              component={Task3_NotificationScreen}
              options={{ title: "Task 3 — Notifications" }}
            />
            <Stack.Screen
              name="FullScreenNoti"
              component={FullScreenNotification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Task4_Location"
              component={Task4_LocationScreen}
              options={{ title: "Task 4 — Location" }}
            />
            <Stack.Screen
              name="Task5_Dashboard"
              component={Task5_DashboardScreen}
              options={{ title: "Task 5 — Dashboard" }}
            />
            <Stack.Screen
              name="LeadDetails"
              component={LeadDetails}
              options={{ title: "Lead Details" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LeadsProvider>
    </PaperProvider>
  );
}
