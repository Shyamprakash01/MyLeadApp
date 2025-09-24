import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeadsContext = createContext();

const initialLeads = [
  { id: 'l1', name: 'Asha Grocers', lat: 12.9719, lon: 77.6412, location: 'Koramangala', matchScore: 88 },
  { id: 'l2', name: 'Blue Salon', lat: 12.9352, lon: 77.6245, location: 'Jayanagar', matchScore: 72 },
  { id: 'l3', name: 'Campus Cafe', lat: 12.9822, lon: 77.6643, location: 'MG Road', matchScore: 91 },
  // add more...
];

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(initialLeads);
  const [declined, setDeclined] = useState([]);

  useEffect(() => {
    // load declined from storage
    (async () => {
      const s = await AsyncStorage.getItem('declinedLeads');
      if (s) setDeclined(JSON.parse(s));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('declinedLeads', JSON.stringify(declined));
  }, [declined]);

  const declineLead = (lead) => setDeclined(prev => [lead, ...prev]);
  const acceptLead = (lead) => {
    // optionally remove lead or mark accepted
    setLeads(prev => prev.filter(l => l.id !== lead.id));
  };

  return (
    <LeadsContext.Provider value={{ leads, declined, declineLead, acceptLead, setLeads }}>
      {children}
    </LeadsContext.Provider>
  );
}

export const useLeads = () => useContext(LeadsContext);
