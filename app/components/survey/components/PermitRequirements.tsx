import { permitProcesslogic } from '@/app/utils/_helper'
import {
  ExteriorWorkEnum,
  InteriorWorkEnum,
  PermitStatusEnum,
  SurveyData,
} from '@/app/utils/constants'
import { InHouse, NoPermit, OverTheCounter } from './process'

interface PermitRequirementsProps {
  surveyData: SurveyData
  handlePermitRequest: (status: PermitStatusEnum) => Promise<void>
}

const PermitRequirements = ({
  surveyData,
  handlePermitRequest,
}: PermitRequirementsProps) => {
  const { interiorWork, exteriorWork } = surveyData
  const getPermitStatus = () => {
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
      return PermitStatusEnum.IN_HOUSE
    } else if (
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
      return PermitStatusEnum.OTC
    } else {
      return PermitStatusEnum.NO_PERMIT
    }
  }

  const renderRequirements = () => {
    const status = getPermitStatus()
    // return in order of priority
    switch (status) {
      case PermitStatusEnum.IN_HOUSE:
        return <InHouse />
      case PermitStatusEnum.OTC:
        return <OverTheCounter />
      case PermitStatusEnum.NO_PERMIT:
        return <NoPermit />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4 py-2 h-full justify-between">
      {renderRequirements()}
      {getPermitStatus() !== PermitStatusEnum.NO_PERMIT && (
        <button
          aria-label="Permit Request"
          type="submit"
          onClick={() => handlePermitRequest(getPermitStatus())}
          className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-green-600 px-6 text-lg text-white transition duration-400 hover:bg-green-500 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none disabled:text-green-100"
        >
          Request Permit
        </button>
      )}
    </div>
  )
}

export default PermitRequirements
