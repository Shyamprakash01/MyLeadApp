import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Paragraph, Title, Chip } from 'react-native-paper';

const mockApi = async (query) => {
  // simulate network
  await new Promise(r=>setTimeout(r,600));
  return [
    { id:'a1', name:'Alpha Shop', location:'Indiranagar', matchScore: 85 },
    { id:'a2', name:'Beta Supplies', location:'Whitefield', matchScore: 66 },
    { id:'a3', name:'Gamma Store', location:'HSR', matchScore: 92 },
  ];
};

export default function Task2_ChatScreen() {
  const [messages, setMessages] = useState([
    { id:'m0', type:'bot', text:'Ask me something (e.g., "Show me nearby leads")'}
  ]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, type:'user', text: input };
    setMessages(prev=>[...prev, userMsg]);
    setInput('');
    const leads = await mockApi(input);
    // push results as a bot message containing lead cards
    const botMsg = { id:`b-${Date.now()}`, type:'bot', leads };
    setMessages(prev=>[...prev, botMsg]);
  };

  const renderItem = ({item}) => {
    if (item.type === 'user') {
      return <View style={{alignItems:'flex-end', marginVertical:8}}><Card><Card.Content><Paragraph>{item.text}</Paragraph></Card.Content></Card></View>;
    }
    if (item.type === 'bot' && item.leads) {
      return item.leads.map(lead => (
        <Card key={lead.id} style={{marginVertical:6}}>
          <Card.Content>
            <Title>{lead.name}</Title>
            <Paragraph>{lead.location}</Paragraph>
            <Chip style={{marginTop:8}} icon={lead.matchScore > 80 ? 'star' : undefined}>
              Match: {lead.matchScore}%
            </Chip>
          </Card.Content>
        </Card>
      ));
    }
    return <Card><Card.Content><Paragraph>{item.text}</Paragraph></Card.Content></Card>;
  };

  return (
    <View style={{flex:1, padding:12}}>
      <FlatList data={messages} keyExtractor={m=>m.id} renderItem={renderItem} />
      <View style={{flexDirection:'row', marginTop:12}}>
        <TextInput style={{flex:1}} placeholder="Type a query" value={input} onChangeText={setInput} />
        <Button mode="contained" onPress={send} style={{marginLeft:8}}>Send</Button>
      </View>
    </View>
  );
}
