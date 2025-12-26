import { Linking, Pressable, Text } from "react-native";
import { styles } from "./styles";
import { Coordinate, Props } from "./types";


export const OpenMapButton: React.FC<Props> = ({ coordinates }) => {
  const openFirstCoordinate = async (
      coords: Coordinate[]
    ): Promise<void> => {
      if (!coords || coords.length === 0) return;

      const { latitude, longitude } = coords[0];
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

      await Linking.openURL(url);
    };
    
  return (
    <Pressable
      onPress={() => openFirstCoordinate(coordinates)}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>Open in Maps</Text>
    </Pressable>
  );
};
