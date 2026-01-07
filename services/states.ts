/* eslint-disable @typescript-eslint/no-require-imports */
interface stateData {
    code: string;
    name: string;
    image: any;
};

export function getStateImage(stateName: string): string {
  return `../assets/images/${stateName}-Outline-Map.jpg`;
}

export const allStates: stateData[] = [
    { code: "AL", name: "Alabama", image: require(getStateImage("Alabama")) },
    { code: "AK", name: "Alaska", image: require(getStateImage("Alaska")) },
    { code: "AZ", name: "Arizona", image: require(getStateImage("Arizona")) },
    { code: "AR", name: "Arkansas", image: require(getStateImage("Arkansas")) },
    { code: "CA", name: "California", image: require(getStateImage("California")) },
    { code: "CO", name: "Colorado", image: require(getStateImage("Colorado")) },
    { code: "CT", name: "Connecticut", image: require(getStateImage("Connecticut")) },
    { code: "DE", name: "Delaware", image: require(getStateImage("Delaware")) },
    { code: "FL", name: "Florida", image: require(getStateImage("Florida")) },
    { code: "GA", name: "Georgia", image: require(getStateImage("Georgia")) },
    { code: "HI", name: "Hawaii", image: require(getStateImage("Hawaii")) },
    { code: "ID", name: "Idaho", image: require(getStateImage("Idaho")) },
    { code: "IL", name: "Illinois", image: require(getStateImage("Illinois")) },
    { code: "IN", name: "Indiana", image: require(getStateImage("Indiana")) },
    { code: "IA", name: "Iowa", image: require(getStateImage("Iowa")) },
    { code: "KS", name: "Kansas", image: require(getStateImage("Kansas")) },
    { code: "KY", name: "Kentucky", image: require(getStateImage("Kentucky")) },
    { code: "LA", name: "Louisiana", image: require(getStateImage("Louisiana")) },
    { code: "ME", name: "Maine", image: require(getStateImage("Maine")) },
    { code: "MD", name: "Maryland", image: require(getStateImage("Maryland")) },
    { code: "MA", name: "Massachusetts", image: require(getStateImage("Massachusetts")) },
    { code: "MI", name: "Michigan", image: require(getStateImage("Michigan")) },
    { code: "MN", name: "Minnesota", image: require(getStateImage("Minnesota")) },
    { code: "MS", name: "Mississippi", image: require(getStateImage("Mississippi")) },
    { code: "MO", name: "Missouri", image: require(getStateImage("Missouri")) },
    { code: "MT", name: "Montana", image: require(getStateImage("Montana")) },
    { code: "NE", name: "Nebraska", image: require(getStateImage("Nebraska")) },
    { code: "NV", name: "Nevada", image: require(getStateImage("Nevada")) },
    { code: "NH", name: "New Hampshire", image: require(getStateImage("New-Hampshire")) },
    { code: "NJ", name: "New Jersey", image: require(getStateImage("New-Jersey")) },
    { code: "NM", name: "New Mexico", image: require(getStateImage("New-Mexico")) },
    { code: "NY", name: "New York", image: require(getStateImage("New-York")) },
    { code: "NC", name: "North Carolina", image: require(getStateImage("North-Carolina")) },
    { code: "ND", name: "North Dakota", image: require(getStateImage("North-Dakota")) },
    { code: "OH", name: "Ohio", image: require(getStateImage("Ohio")) },
    { code: "OK", name: "Oklahoma", image: require(getStateImage("Oklahoma")) },
    { code: "OR", name: "Oregon", image: require(getStateImage("Oregon")) },
    { code: "PA", name: "Pennsylvania", image: require(getStateImage("Pennsylvania")) },
    { code: "RI", name: "Rhode Island", image: require(getStateImage("Rhode-Island")) },
    { code: "SC", name: "South Carolina", image: require(getStateImage("South-Carolina")) },
    { code: "SD", name: "South Dakota", image: require(getStateImage("South-Dakota")) },
    { code: "TN", name: "Tennessee", image: require(getStateImage("Tennessee")) },
    { code: "TX", name: "Texas", image: require(getStateImage("Texas")) },
    { code: "UT", name: "Utah", image: require(getStateImage("Utah")) },
    { code: "VT", name: "Vermont", image: require(getStateImage("Vermont")) },
    { code: "VA", name: "Virginia", image: require(getStateImage("Virginia")) },
    { code: "WA", name: "Washington", image: require(getStateImage("Washington")) },
    { code: "WV", name: "West Virginia", image: require(getStateImage("West-Virginia")) },
    { code: "WI", name: "Wisconsin", image: require(getStateImage("Wisconsin")) },
    { code: "WY", name: "Wyoming", image: require(getStateImage("Wyoming")) },
];