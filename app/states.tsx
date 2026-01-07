import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { stateStyle } from "../styles/usgs";
import { allStates } from "../services/states";

export default function States() {
    return (
        <ScrollView>
            {allStates.map((state) => (
                <Pressable key={state.code}>
                    <Text style={stateStyle.name}>
                        {state.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                         <Image
                            source={state.image}
                            style={stateStyle.stateImage}
                            resizeMode="contain"
                        />
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
};