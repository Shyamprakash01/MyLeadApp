import { StyleSheet, View } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { useLeads } from "../context/LeadsContext";

export default function FullScreenNotification({ navigation, route }) {
  const { lead } = route.params;
  const { declineLead, acceptLead } = useLeads();

  const onAccept = () => {
    acceptLead(lead);
    navigation.replace("LeadDetails", { lead });
  };

  const onReject = () => {
    declineLead(lead);
    navigation.goBack();
  };

  return (
    <View style={styles.full}>
      <Title style={{ marginBottom: 8 }}>{lead.name}</Title>
      <Paragraph style={{ marginBottom: 24 }}>{lead.location}</Paragraph>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button mode="contained" onPress={onAccept}>
          Accept
        </Button>
        <Button mode="outlined" onPress={onReject}>
          Reject
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
