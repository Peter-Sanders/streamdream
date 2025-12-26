import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { USGSAPI } from "../../services/usgs";
import { OpenMapButton } from "../googleMaps/googleMapsSearch";
import { monitoringLocationData } from "./types";


export default function MonitoringLocations() {
    const params: Record<string, string> = useLocalSearchParams();
    const [monitoringLocations, setMonitoringLocations] = useState<monitoringLocationData>();

    useEffect(() => { fetchLocations(params.state_code); }, [params.state_code]);

    async function fetchLocations(state_code: string) {

        try {
            const monitoringLocations = await USGSAPI.getMonitoringLocations(state_code);
            setMonitoringLocations(monitoringLocations);
        }
        catch (e) {
            console.log(e);
        };

    };

    return (
        <View style={{ flex: 1 }}>
            <Text>
                Returned {monitoringLocations?.numberReturned} Locations
            </Text>
            <ScrollView style={{ flexGrow: 1 }}>
                {
                    monitoringLocations?.features.map((monitoringLocation) => (
                        <Link
                            key={monitoringLocation.id}
                            style={{ backgroundColor: "rgba(66, 208, 233, 0.49)", padding: 12, borderRadius: 6, margin: 10 }}
                            href={{
                                pathname: "/latest_guages",
                                params: {
                                    monitoring_location_id: monitoringLocation.id ?? "",
                                    monitoring_location_name: monitoringLocation.properties.monitoring_location_name ?? ""
                                }
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>
                                {monitoringLocation.properties.monitoring_location_name}
                            </Text>
                            <View>
                                <Text>
                                    Site Type: {monitoringLocation.properties.site_type}
                                </Text>
                                <OpenMapButton
                                    coordinates={[
                                        {
                                            latitude: monitoringLocation.geometry.coordinates[1],
                                            longitude: monitoringLocation.geometry.coordinates[0]
                                        }
                                    ]} />
                            </View>
                        </Link>
                    ))}
            </ScrollView>
        </View>
    );

};