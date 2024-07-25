export enum InteriorWorkEnum {
  BATHROOM_REMODEL = 'Bathroom remodel',
  NEW_BATHROOM = 'New bathroom',
  NEW_LAUNDRY_ROOM = 'New laundry room',
  OTHER = 'Other',
}

export enum ExteriorWorkEnum {
  GARAGE_DOOR_REPLACEMENT = 'Garage door replacement',
  EXTERIOR_DOORS = 'Exterior doors',
  FENCING = 'Fencing',
  OTHER = 'Other',
}

export enum WorkTypeEnum {
  INTERIOR = 'Interior Work',
  EXTERIOR = 'Exterior Work',
}

export interface Job {
  name: string
  checked: boolean
}

export interface SurveyData {
  workType: WorkTypeEnum | ''
  interiorWork: Job[]
  exteriorWork: Job[]
}

export const SurveyInitialData: SurveyData = {
  workType: '',
  interiorWork: [
    { name: InteriorWorkEnum.BATHROOM_REMODEL, checked: false },
    { name: InteriorWorkEnum.NEW_BATHROOM, checked: false },
    { name: InteriorWorkEnum.NEW_LAUNDRY_ROOM, checked: false },
    { name: InteriorWorkEnum.OTHER, checked: false },
  ],
  exteriorWork: [
    { name: ExteriorWorkEnum.GARAGE_DOOR_REPLACEMENT, checked: false },
    { name: ExteriorWorkEnum.EXTERIOR_DOORS, checked: false },
    { name: ExteriorWorkEnum.FENCING, checked: false },
    { name: ExteriorWorkEnum.OTHER, checked: false },
  ],
}

// supabase
export enum PermitStatusEnum {
  OTC = 'Over-the-Counter Submission Process',
  IN_HOUSE = 'In-House Review Process',
  NO_PERMIT = 'No Permit',
}

export type PermitStatus =
  | PermitStatusEnum.IN_HOUSE
  | PermitStatusEnum.OTC
  | PermitStatusEnum.NO_PERMIT

export interface AddPermitEntryRequest {
  type: string
  job_list: string[]
  permit_status: PermitStatus
}
