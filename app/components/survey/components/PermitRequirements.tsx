import { permitProcesslogic } from '@/app/utils/_helper'
import {
  ExteriorWorkEnum,
  InteriorWorkEnum,
  SurveyData,
} from '@/app/utils/constants'
import { InHouse, NoPermit, OverTheCounter } from './process'

interface PermitRequirementsProps {
  surveyData: SurveyData
}

const PermitRequirements = ({ surveyData }: PermitRequirementsProps) => {
  const { interiorWork, exteriorWork } = surveyData

  const renderRequirements = () => {
    // return in order of priority
    if (
      permitProcesslogic(
        interiorWork,
        (job) => job.name !== InteriorWorkEnum.BATHROOM_REMODEL
      ) ||
      permitProcesslogic(
        exteriorWork,
        (job) => job.name === ExteriorWorkEnum.OTHER
      )
    ) {
      return <InHouse />
    }

    if (
      permitProcesslogic(
        interiorWork,
        (job) => job.name === InteriorWorkEnum.BATHROOM_REMODEL
      ) ||
      permitProcesslogic(
        exteriorWork,
        (job) =>
          job.name === ExteriorWorkEnum.GARAGE_DOOR_REPLACEMENT ||
          job.name === ExteriorWorkEnum.EXTERIOR_DOORS
      )
    ) {
      return <OverTheCounter />
    }

    if (
      permitProcesslogic(
        exteriorWork,
        (job) => job.name === ExteriorWorkEnum.FENCING
      )
    ) {
      return <NoPermit />
    }

    return null
  }

  return renderRequirements()
}

export default PermitRequirements
