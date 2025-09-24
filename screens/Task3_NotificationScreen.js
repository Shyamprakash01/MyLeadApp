import { View } from "react-native";
import { Button, Paragraph } from "react-native-paper";

export default function Task3_NotificationScreen({ navigation }) {
  // We'll just simulate: on press, navigate to the full screen notification
  const sampleLead = {
    id: "l-sim",
    name: "Simulated Lead",
    location: "Mall Road",
    matchScore: 78,
    lat: 12.97,
    lon: 77.59,
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Paragraph>Simulate receiving a push notification (mock).</Paragraph>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("FullScreenNoti", { lead: sampleLead })
        }
        style={{ marginTop: 12 }}
      >
        Simulate Full-Screen Notification
      </Button>
    </View>
  );
}
