import { View } from "react-native";
import { Paragraph, Title } from "react-native-paper";

export default function LeadDetails({ route }) {
  const { lead } = route.params;
  return (
    <View style={{ padding: 16 }}>
      <Title>{lead.name}</Title>
      <Paragraph>{lead.location}</Paragraph>
      <Paragraph>Match: {lead.matchScore}%</Paragraph>
    </View>
  );
}
