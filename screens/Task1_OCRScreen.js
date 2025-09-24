import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";

// mock confidence generator
function mockConfidence() {
  return Math.floor(60 + Math.random() * 40);
}

// mock OCR function (replace with real OCR later)
async function mockOCR(uri) {
  // in real case you would run ML OCR here
  // we just simulate some recognized text
  const fakeText =
    "Name: John Doe\nID: ABC123456\nDOB: 1995-05-21";
  return fakeText.split(/\s+/);
}

export default function Task1_OCRScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [fields, setFields] = useState({ name: "", id: "", dob: "" });
  const [conf, setConf] = useState({ name: 0, id: 0, dob: 0 });
  const [loading, setLoading] = useState(false);

  const pickImage = async (camera = false) => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (perm.status !== "granted") {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    const res = camera
      ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });

    if (!res.canceled) {
      const uri = res.assets[0].uri;
      setImageUri(uri);
      runOCR(uri);
    }
  };

  const runOCR = async (uri) => {
    try {
      setLoading(true);

      const arr = await mockOCR(uri); // mock OCR
      const joined = arr.join(" ");

      const nameMatch = joined.match(/Name:\s*([A-Za-z ]+)/);
      const idMatch = joined.match(/ID:\s*([A-Z0-9]+)/);
      const dobMatch = joined.match(
        /DOB:\s*(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})/
      );

      setFields({
        name: nameMatch ? nameMatch[1] : "",
        id: idMatch ? idMatch[1] : "",
        dob: dobMatch ? dobMatch[1] : "",
      });

      setConf({
        name: mockConfidence(),
        id: mockConfidence(),
        dob: mockConfidence(),
      });
    } catch (e) {
      console.error(e);
      Alert.alert("OCR failed", e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    Alert.alert("Saved", JSON.stringify(fields, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button
        mode="contained"
        onPress={() => pickImage(true)}
        style={{ marginBottom: 8 }}
      >
        Capture ID (Camera)
      </Button>
      <Button
        mode="outlined"
        onPress={() => pickImage(false)}
        style={{ marginBottom: 16 }}
      >
        Pick from gallery
      </Button>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 200, marginBottom: 12 }}
          resizeMode="contain"
        />
      )}

      <TextInput
        label={`Name (confidence: ${conf.name}%)`}
        value={fields.name}
        onChangeText={(t) => setFields((s) => ({ ...s, name: t }))}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label={`ID Number (confidence: ${conf.id}%)`}
        value={fields.id}
        onChangeText={(t) => setFields((s) => ({ ...s, id: t }))}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label={`DOB (confidence: ${conf.dob}%)`}
        value={fields.dob}
        onChangeText={(t) => setFields((s) => ({ ...s, dob: t }))}
        style={{ marginBottom: 8 }}
      />

      <Button mode="contained" onPress={save} loading={loading}>
        Save
      </Button>
    </ScrollView>
  );
}
