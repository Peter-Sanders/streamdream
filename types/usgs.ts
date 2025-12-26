export type baseInterface<TProperties> = {
  type: string
  timeStamp: string
  numberReturned: number
  features: {
    type: string 
    id: string 
    geometry: {
      type: string
      coordinates: number[]
    }
    properties: TProperties
  }[]
  links: {
    type: string
    rel:string
    title:string
    href:string
  }[]
};

export interface parameterCodeProperty {
  parameter_group_code: string
  medium: string
  weight_basis: string
  particle_size_basis: string
  sample_fraction: string
  unit_of_measure: string
  parameter_name: string
  parameter_description: string
  statistical_basis: string
  time_basis: string
  temperature_basis: string
  epa_equivalence: string
};

export type parameterCodeData = baseInterface<parameterCodeProperty>;