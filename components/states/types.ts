import { baseInterface } from "../../types/usgs";

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

export interface stateProperty {
  state_name: string
  country_code:string 
  state_postal_code: StateCode 
  state_fips_code: string
};


export type stateData = baseInterface<stateProperty>;