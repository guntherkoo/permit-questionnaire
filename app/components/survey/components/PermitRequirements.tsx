import {
  ExteriorWorkEnum,
  InteriorWorkEnum,
  SurveyData,
} from '@/app/utils/constants'

interface PermitRequirementsProps {
  surveyData: SurveyData
}

const PermitRequirements = ({ surveyData }: PermitRequirementsProps) => {
  const { interiorWork, exteriorWork } = surveyData

  const renderRequirements = () => {
    const interiorOTCProcess = interiorWork.filter(
      (job) => job.checked && job.name === InteriorWorkEnum.BATHROOM_REMODEL
    )
    const exteriorOTCProcess = exteriorWork.filter(
      (job) =>
        job.checked &&
        (job.name === ExteriorWorkEnum.GARAGE_DOOR_REPLACEMENT ||
          job.name === ExteriorWorkEnum.EXTERIOR_DOORS)
    )

    const interiorInHouseProcess = interiorWork.filter(
      (job) => job.checked && job.name !== InteriorWorkEnum.BATHROOM_REMODEL
    )
    const exteriorInHouseProcess = exteriorWork.filter(
      (job) => job.checked && job.name === ExteriorWorkEnum.OTHER
    )

    const noPermitProcess = exteriorWork.filter(
      (job) => job.checked && job.name === ExteriorWorkEnum.FENCING
    )

    // return in order of priority
    if (
      interiorInHouseProcess.length > 0 ||
      exteriorInHouseProcess.length > 0
    ) {
      return (
        <div className="flex flex-col gap-2">
          <h2>✅ In-House Review Process</h2>
          <ul className="list-disc ml-5">
            <li>A building permit is required.</li>
            <li>Include plan sets.</li>
            <li>Submit application for in-house review.</li>
          </ul>
        </div>
      )
    }

    if (interiorOTCProcess.length > 0 || exteriorOTCProcess.length > 0) {
      return (
        <div className="flex flex-col gap-2">
          <h2>✅ Over-the-Counter Submission Process</h2>
          <ul className="list-disc ml-5">
            <li>A building permit is required.</li>
            <li>Submit application for OTC review.</li>
          </ul>
        </div>
      )
    }

    if (noPermitProcess.length > 0) {
      return (
        <div className="flex flex-col gap-2">
          <h2>❌ No Permit</h2>
          <p>Nothing is required! You&apos;re set to build.</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl">Permit Requirements:</h2>
      {renderRequirements()}
    </div>
  )
}

export default PermitRequirements
