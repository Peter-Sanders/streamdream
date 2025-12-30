import { Linking, Pressable, Text, Button } from "react-native";
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

    if (! coordinates  || coordinates.length === 0) {
      return <Button 
        title="Location not Found"
        color='#e81a1aff'
      />
    }
    
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
