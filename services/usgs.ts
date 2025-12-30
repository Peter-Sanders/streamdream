import { parameterCodeData } from "../types/usgs";
import type { monitoringLocationData } from "../components/monitoringLocation/types";
import type { stateData } from "../components/states/types";
import { latestContinuousData } from "../components/latestContinuous/types";

const baseHeaders:Record<string, string> = {
    api_key: process.env.EXPO_PUBLIC_USGS_API_KEY ?? ""
};
const baseParams:Record<string, string> = {
    f:"json",
    limit:"60",
    skipGeometry:"false",
    offset:"0"
};

interface queryParamsType  {
    [key: string]:any;
}

const baseURL:string = "https://api.waterdata.usgs.gov/ogcapi/v0/collections";

async function GetUSGSData<T>(
    endpoint:string, 
    params:Record<string,string>={}, 
    lang:string="en-us", 
    limit:number=1000, 
    offset:number=0,
    sub_route:string="items"
): Promise<T> {
    
    const query = new URLSearchParams({
        ...baseParams, 
        ...params, 
        lang:lang,
        limit:limit.toString(),
        offset:offset.toString(),
    });

    const url:string = `${baseURL}/${endpoint}/${sub_route}?${query}`;
    

    try {
        const response = await fetch (url, {method: 'GET', headers: baseHeaders});
        if (! response.ok) {
            throw new Error(`Got a bad http status (${response.status}) for this request: ${url}`);
        };
        return await response.json() as T;

    } catch (error) {
    if (error instanceof Error) {
      console.error('Drat:', error.message);
    }
    throw error; 
  }

};


export const USGSAPI = {
    async getStates(country_code:string="US", lang?:string): Promise<stateData> {
        try {
            return await GetUSGSData<stateData>("states", {country_code:country_code}, lang);
        }
        catch (error) {
            console.error("Experienced some issue getting states", error);
            throw error;
        }
    },
    async getMonitoringLocations(
        state_code:string, 
        // site_type_codes:string[]=['ST'], 
        site_type_code:string='ST',
        country_code:string="US", 
        lang?:string,
        agency_code:string="USGS",
        sort_by?:string,
        limit?:number,
        offset?:number
    ): Promise<monitoringLocationData> {

        // const filterExpr = `site_type_code IN (${site_type_codes.map(v => `'${v}'`).join(', ')})`;
        const queryParams: queryParamsType= {
            country_code:country_code, 
            state_code:state_code,
            agency_code:agency_code,
            site_type_code:site_type_code,
            // filter:filterExpr,
        }

        if (sort_by) {
            queryParams.sortby = sort_by;
        };

        if (limit) {
            queryParams.limit = limit.toString();
        };

        if (offset) {
            queryParams.offset = offset.toString();
        };

        try {
            return await GetUSGSData<monitoringLocationData>(
                "monitoring-locations", 
                queryParams, 
                lang,
            ) as monitoringLocationData;
        }
        catch (error) {
            console.error("Experiences some issue getting monitoring locations", error);
            throw error;
        }
    },
    async getParameterCodeDetails(parameter_code_id:string, lang?:string): Promise<parameterCodeData> {

        const queryParams = {
            id:parameter_code_id
        }

        try {

            return await GetUSGSData<parameterCodeData>(
                "parameter-codes",
                queryParams,
                lang
            ) as parameterCodeData;
        } catch (error) {
            console.error("Experienced some issue getting paramter code data", error);
            throw error;           
        }
    },
    async getBulkParameterCodeDetails(parameter_code_ids:string[], lang?:string): Promise<parameterCodeData> {

        const filterExpr = `id IN (${parameter_code_ids.map(v => `'${v}'`).join(', ')})`;
        const queryParams = {
            filter:filterExpr
        }

        try {

            return await GetUSGSData<parameterCodeData>(
                "parameter-codes",
                queryParams,
                lang
            ) as parameterCodeData;
        } catch (error) {
            console.error("Experienced some issue getting bulk paramter code data", error);
            throw error;           
        }
    },
    async getLatestContinuous(monitoring_location_id:string, lang?:string): Promise<latestContinuousData> {
        
        const queryParams = {
            monitoring_location_id:monitoring_location_id
        }

        try {
            return await GetUSGSData<latestContinuousData>(
                "latest-continuous",
                queryParams,
                lang
            ) as latestContinuousData;
        } catch (error) {
            console.error("Experienced some issue getting latest continuous data", error);
            throw error;
        }
    }
};

