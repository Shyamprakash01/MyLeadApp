import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={{marginBottom:16}}>Tasks</Title>
      <Button mode="contained" onPress={() => navigation.navigate('Task1_OCR')} style={styles.btn}>Task 1: OCR</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Task2_Chat')} style={styles.btn}>Task 2: AI Chat</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Task3_Notifs')} style={styles.btn}>Task 3: Notifications</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Task4_Location')} style={styles.btn}>Task 4: Location</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Task5_Dashboard')} style={styles.btn}>Task 5: Dashboard</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  btn:{marginBottom:12}
});
