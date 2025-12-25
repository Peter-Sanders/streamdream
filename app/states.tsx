import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { USGSAPI } from "../services/usgs";
import { stateFeature, StateCode } from "../types/usgs";
import { stateStyle } from "../styles/usgs";
import { stateImages, DefaultStateImage } from "../services/image";


interface Props {
  stateCode: StateCode;
}

export function StateImage({ stateCode }: Props) {
    const imageSource = stateImages[stateCode] ?? DefaultStateImage;

    return (
        <Image
        source={imageSource}
        style={stateStyle.stateImage}
        resizeMode="contain"
        />
    );
};


export default function States() {
    const [states, setStates] = useState<stateFeature[]>([]);

    useEffect( () => {
        fetchStates();
    }, [])

    async function fetchStates() {
        try {
            const states = await USGSAPI.getStates();
            setStates(states);
        
        } catch (e) {
            console.log(e);
        }
        
    };

    return (
        <ScrollView>
        {states.map((state) =>(
            <Pressable key={state.id}>
            <Text style={stateStyle.name}>
                {state.properties.state_name}
            </Text>
            <View style={{flexDirection: "row"}}>
                <StateImage stateCode={state.properties.state_postal_code}/>
            </View>
            </Pressable>
        ))}
        </ScrollView>
    );
};