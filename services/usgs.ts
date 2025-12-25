import type { stateData, stateFeature, Params } from "../types/usgs";

const baseHeaders:Params = {
    api_key: process.env.EXPO_PUBLIC_USGS_API_KEY ?? ""
};
const baseParams:Params = {
    f:"json",
    limit:"60",
    skipGeometry:"false",
    offset:"0"
};

const baseURL:string = "https://api.waterdata.usgs.gov/ogcapi/v0/collections";

async function GetUSGSData<T>(endpoint:string, params:Record<string,string>={}, lang:string="en-us"): Promise<T> {
    
    const query = new URLSearchParams({
        ...baseParams, 
        ...params, 
        lang:lang
    });

    const url:string = `${baseURL}/${endpoint}?${query}`;
    console.log(url);

    try {
        const response = await fetch (
            url,
            {
                method: 'GET',
                headers: baseHeaders
            } 
        );
        const data = (await response.json()) as T;

        return data;
    } catch (e) {
        console.log(e)
        throw e;
    };

};

  export const USGSAPI = {
    async getStates(country_code:string="US", lang?:string): Promise<stateFeature[]> {
        const data = GetUSGSData<stateData>("states/items", {country_code:country_code}, lang);
        const dataFeatures:stateFeature[] = (await data).features;

        return dataFeatures;
    }
  }