import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{title:"Select a State"}}
    />
    <Stack.Screen
    name="monitoring_locations"
    options={
      {
        title:"Monitoring Locations",
        headerBackButtonDisplayMode: "minimal"
      }
    }
    />
    <Stack.Screen
    name="latest_guages"
    options={
      {
        title: "Latest Data",
        headerBackButtonDisplayMode: "minimal"
      }
    }
    />
  </Stack>;
};
