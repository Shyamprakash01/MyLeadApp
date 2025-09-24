import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Chip, List, Title } from "react-native-paper";
import { useLeads } from "../context/LeadsContext";
import haversine from "../utils/geo";

export default function Task5_DashboardScreen() {
  const { leads } = useLeads();
  const [sortBy, setSortBy] = useState("distance"); // or 'score'
  const [filter70, setFilter70] = useState(false);

  // fake user location; in real app use context or props
  const user = { lat: 12.97, lon: 77.59 };

  const enriched = useMemo(
    () =>
      leads.map((l) => {
        const distance = haversine(user.lat, user.lon, l.lat, l.lon);
        return { ...l, distance };
      }),
    [leads]
  );

  let list = enriched;
  if (filter70) list = list.filter((l) => l.matchScore > 70);
  if (sortBy === "distance")
    list = list.sort((a, b) => a.distance - b.distance);
  else list = list.sort((a, b) => b.matchScore - a.matchScore);

  const best = list.reduce(
    (bestSoFar, cur) =>
      !bestSoFar || cur.matchScore > bestSoFar.matchScore ? cur : bestSoFar,
    null
  );

  return (
    <View style={{ flex: 1 }}>
      <Title style={{ margin: 12 }}>Lead Allocation</Title>
      <View
        style={{ flexDirection: "row", paddingHorizontal: 12, marginBottom: 8 }}
      >
        <Button onPress={() => setSortBy("distance")}>Sort: Distance</Button>
        <Button onPress={() => setSortBy("score")}>Sort: Score</Button>
        <Chip
          style={{ marginLeft: 8 }}
          onPress={() => setFilter70((f) => !f)}
          selected={filter70}
        >
          {filter70 ? "Showing >70" : "Show >70"}
        </Chip>
      </View>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${item.location} — ${item.distance.toFixed(0)} m — ${
              item.matchScore
            }%`}
            style={{
              backgroundColor:
                best && item.id === best.id ? "#e6ffe6" : undefined,
            }}
          />
        )}
      />
    </View>
  );
}
