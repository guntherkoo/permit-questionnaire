export enum InteriorWorkEnum {
  BATHROOM_REMODEL = 'Bathroom remodel',
  NEW_BATHROOM = 'New bathroom',
  NEW_LAUNDRY_ROOM = 'New laundry room',
  OTHER = 'Other',
}

// export type InteriorWorkType =
//   | InteriorWorkEnum.BATHROOM_REMODEL
//   | InteriorWorkEnum.NEW_BATHROOM
//   | InteriorWorkEnum.NEW_LAUNDRY_ROOM
//   | InteriorWorkEnum.OTHER

export enum ExteriorWorkEnum {
  GARAGE_DOOR_REPLACEMENT = 'Garage door replacement',
  EXTERIOR_DOORS = 'Exterior doors',
  FENCING = 'Fencing',
  OTHER = 'Other',
}

// export type ExteriorWorkType =
//   | ExteriorWorkEnum.GARAGE_DOOR_REPLACEMENT
//   | ExteriorWorkEnum.EXTERIOR_DOORS
//   | ExteriorWorkEnum.FENCING
//   | ExteriorWorkEnum.OTHER

export enum WorkTypeEnum {
  INTERIOR = 'Interior Work',
  EXTERIOR = 'Exterior Work',
}

// export type WorkType = WorkTypeEnum.INTERIOR | WorkTypeEnum.EXTERIOR

export interface Job {
  name: string
  checked: boolean
}

export interface SurveyData {
  workType: WorkTypeEnum | ''
  interiorWork: Job[]
  exteriorWork: Job[]
}
