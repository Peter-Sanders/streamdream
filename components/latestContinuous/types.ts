import { baseInterface } from "../../types/usgs";


interface latestContinuousProperty {
    time_series_id: string
    statistic_id: string
    value:  string
    qualifier: string
    parameter_code: string
    monitoring_location_id: string
    time: string
    unit_of_measure: string
    approval_status: string
    last_modified: string
};

export type latestContinuousData = baseInterface<latestContinuousProperty>;