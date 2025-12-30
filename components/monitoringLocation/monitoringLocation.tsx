import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, Button, TextInput } from "react-native";
import { USGSAPI } from "../../services/usgs";
import { OpenMapButton } from "../googleMaps/googleMapsSearch";
import { monitoringLocationData } from "./types";
import { styles } from "./styles";


export default function MonitoringLocations() {
    const params: Record<string, string> = useLocalSearchParams();
    const [monitoringLocations, setMonitoringLocations] = useState<monitoringLocationData>();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [validSites, setValidSites] = useState<Set<string>>(new Set()); // Cache of site IDs with data
    const [checkingData, setCheckingData] = useState(false);
    const pageSize = 60;
    
    useEffect(() => { fetchLocations(params.state_code, 0); }, [params.state_code]);

    async function fetchLocations(state_code: string, offset:number=0) {

        try {
            const res = await USGSAPI.getMonitoringLocations(
                state_code,
                undefined,
                undefined,
                undefined,
                undefined,
                "monitoring_location_name",
                pageSize,
                offset
            );

            setMonitoringLocations(prev => 
                offset > 0 && prev 
                    ? { ...prev, features: [...prev.features, ...res.features] }
                    : res
            );

        if (offset === 0) {
            await checkSitesForData(res.features.map(f => f.id))
        } else {
            const newSiteIds = res.features 
                .map(f => f.id)
                .filter(id => !validSites.has(id));
            await checkSitesForData(newSiteIds);
        };

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        };
    };

    async function checkSitesForData(siteIds: string[]) {
        setCheckingData(true);
        const newValidSites = new Set(validSites);

        for (const siteId of siteIds) {
            try {
                const data = await USGSAPI.getLatestContinuous(siteId);
                if (data.features && data.features.length > 0) {
                    newValidSites.add(siteId);
                }
            } catch (error) {
                console.error(`No data for site ${siteId}`, error);
            }
        }

        setValidSites(newValidSites);
        setCheckingData(false);
    }

    const hasMore = !!monitoringLocations && monitoringLocations.features.length < (monitoringLocations.numberReturned ?? 0);
    const filteredLocations = monitoringLocations?.features.filter(loc =>
        loc.properties.monitoring_location_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

    return (
        <View style={{ flex: 1 }}>
            <Text>Returned {monitoringLocations?.numberReturned ?? 0} Locations</Text>
            <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.search}
            />
            {checkingData && <ActivityIndicator />}
            {/* <ScrollView style={{ flexGrow: 1 }}>
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
            </ScrollView> */}
            <FlatList
        data={filteredLocations}
        keyExtractor={item => item.id}
        renderItem={({ item: monitoringLocation }) => (
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
            <Text style={{ fontSize: 20 }}>{monitoringLocation.properties.monitoring_location_name}</Text>
            <View>
              <Text>Site Type: {monitoringLocation.properties.site_type}</Text>
              <OpenMapButton coordinates={[{
                latitude: monitoringLocation.geometry.coordinates[1],
                longitude: monitoringLocation.geometry.coordinates[0]
              }]} />
            </View>
          </Link>
        )}
        onEndReached={() => {
          if (!loading && !checkingData &&hasMore) {
            fetchLocations(params.state_code, monitoringLocations!.features.length);
          }
        }}
        onEndReachedThreshold={0.8}
        ListFooterComponent={() =>
          loading || checkingData? <ActivityIndicator /> :
          hasMore ? <Button title="Load more" onPress={() => fetchLocations(params.state_code, monitoringLocations!.features.length)} /> : null
        }
      />
        </View>
    );

};