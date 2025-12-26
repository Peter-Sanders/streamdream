import { baseInterface } from "../../types/usgs";

export interface monitoringLocation {
  monitoring_location_number: string
  monitoring_location_name: string
  site_type_code: string
  vertical_datum: string
  original_horizontal_datum_name: string
  well_constructed_depth: number
  agency_code: string
  country_code: string
  site_type: string
  vertical_datum_name: string
  drainage_area: string
  hole_constructed_depth: number
  country_name: string
  hydrologic_unit_code: string
  horizontal_positional_accuracy_code: string
  contributing_drainage_area: string
  depth_source_code: string
  agency_name: string
  state_code: number
  basin_code: string
  horizontal_positional_accuracy: string
  time_zone_abbreviation: string
  state_name: string
  altitude: number
  uses_daylight_savings: string
  construction_date: string
  district_code: string
  county_code: string
  altitude_accuracy: string
  horizontal_position_method_code: string
  aquifer_code: string
  county_name: string
  altitude_method_code: string
  horizontal_position_method_name: string
  national_aquifer_code: string
  minor_civil_division_code: string
  altitude_method_name: string
  original_horizontal_datum: string
  aquifer_type_code: string

};

export type monitoringLocationData = baseInterface<monitoringLocation>;
