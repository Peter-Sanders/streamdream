import { USGSAPI } from "../../services/usgs";
import { baseStyles } from "../../styles/base";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { latestContinuousData } from "./types";
import { parameterCodeData, parameterCodeProperty } from "../../types/usgs";


export default function LatestContinuous() {
    const params: Record<string, string> = useLocalSearchParams();
    console.log(params);
    const [latestContinuous, setLatestContinuous] = useState<latestContinuousData>();
    const [parameterCodeDetails, setParameterCodeDetails] = useState<Map<string, parameterCodeProperty>>(new Map());

    useEffect(() => { fetchLatestContinuous(params.monitoring_location_id); }, [params.monitoring_location_id]);
    useEffect(() => {
        if (!latestContinuous) return;
        fetchParameterCodeDetails(latestContinuous.features);
    }, [latestContinuous]);

    async function fetchLatestContinuous(monitoring_location_id: string) {
        try {
            const latestContinuous = await USGSAPI.getLatestContinuous(monitoring_location_id);
            setLatestContinuous(latestContinuous);
        } catch (error) {
            console.log(error)
        }
    };

    async function fetchParameterCodeDetails(features: latestContinuousData["features"]) {

        try {

            const uniqueParameterCodes = [
                ...new Set(
                    features.map(
                        f => f.properties.parameter_code
                    )
                )
            ];
            const results: parameterCodeData = await USGSAPI.getBulkParameterCodeDetails(uniqueParameterCodes);
            const mapRes = new Map(results.features.map(obj => [obj.id, obj.properties]));

            setParameterCodeDetails(mapRes);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={baseStyles.view}>
            <Text>
                Location: {params.monitoring_location_name}
            </Text>

            <ScrollView style={baseStyles.scrollView}>
                {latestContinuous?.features.map((latest_continuous) => {
                    const details = parameterCodeDetails.get(latest_continuous.properties.parameter_code);

                    return (
                        <View key={latest_continuous.id}>
                            <Text>
                                {details?.parameter_name ?? "Loading..."}
                            </Text>
                            <Text>
                                {details?.parameter_description ?? ""}
                            </Text>
                            <Text>
                                {latest_continuous.properties.value} {details?.unit_of_measure ?? ""}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );

};
