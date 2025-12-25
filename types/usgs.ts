export interface stateFeatureProperty {
  state_name: string
  country_code:string 
  state_postal_code: StateCode 
  state_fips_code: string
};

export interface stateFeature {
  type: string 
  id: string 
  geometry: string 
  properties: stateFeatureProperty
};

export interface stateData {
  type: string 
  features: stateFeature[]
  timestamp: string
};

export type Params = Record<string, string>;

export type StateCode = 
| "AL" 
| "AK" 
| "AZ" 
| "AR"
| "CA"
| "CO" 
| "CT" 
| "DE" 
| "FL" 
| "GA"
| "HI" 
| "ID" 
| "IL" 
| "IN" 
| "IA"
| "KS" 
| "KY" 
| "LA" 
| "ME" 
| "MD"
| "MA" 
| "MI" 
| "MN" 
| "MS" 
| "MO"
| "MT" 
| "NE" 
| "NV" 
| "NH" 
| "NJ"
| "NM" 
| "NY" 
| "NC" 
| "ND" 
| "OH"
| "OK" 
| "OR" 
| "PA" 
| "RI" 
| "SC"
| "SD" 
| "TN" 
| "TX" 
| "UT" 
| "VT"
| "VA" 
| "WA" 
| "WV" 
| "WI" 
| "WY"
| "AS" // American Samoa
| "DC" // District of Columbia
| "FM" // Federated States of Micronesia
| "GU" // Guam
| "MH" // Marshall Islands
| "MP" // Northern Mariana Islands
| "PR" // Puerto Rico
| "PW" // Palau
| "VI" // US Virgin Islands
;
