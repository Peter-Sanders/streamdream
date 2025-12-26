import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { USGSAPI } from "../../services/usgs";
import { styles } from "./styles";
import { stateData } from "./types";
import { StateImage } from "../stateImage/stateImage";





export default function States() {
    const [states, setStates] = useState<stateData>();

    useEffect(() => { fetchStates(); }, []);

    async function fetchStates() {
        try {
            const states = await USGSAPI.getStates();
            setStates(states);

        } catch (e) {
            console.log(e);
        }

    };

    return (
        <ScrollView style={{ flexGrow: 1 }}>
            {states?.features.map((state) => (
                <Link
                    key={state.id}
                    href={{ pathname: "/monitoring_locations", params: { state_code: state.properties.state_fips_code } }}
                >
                    <Text style={styles.name}>
                        {state.properties.state_name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <StateImage stateCode={state.properties.state_postal_code} />
                    </View>
                </Link>
            ))}
        </ScrollView>
    );
};