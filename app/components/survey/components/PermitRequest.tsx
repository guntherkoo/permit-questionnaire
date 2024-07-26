import { PermitStatusEnum, SurveyData } from '@/app/utils/constants'
import PermitRequirements from './PermitRequirements'

interface PermitRequestProps {
  verify: boolean
  surveyData: SurveyData
  handlePermitRequest: (status: PermitStatusEnum) => Promise<void>
  permitRequested: boolean
}

const PermitRequest = ({
  verify,
  surveyData,
  handlePermitRequest,
  permitRequested,
}: PermitRequestProps) => {
  return (
    <div
      className={`flex flex-col gap-5 basis-6/12 bg-slate-800 py-4 px-6 rounded-lg border-2 transition duration-400 ${
        verify ? 'border-green-700' : 'border-blue-900 '
      }`}
    >
      <h2 className="text-xl">Permit Required:</h2>
      <hr className="opacity-20" />
      {permitRequested ? (
        <div className="flex flex-col h-full justify-center">
          <h3 className="text-2xl">✅ Requested</h3>
        </div>
      ) : (
        <>
          {verify ? (
            <PermitRequirements
              surveyData={surveyData}
              handlePermitRequest={handlePermitRequest}
            />
          ) : (
            <p className="text-neutral-300 font-light text-lg pt-2">
              ⬅️ Verify the work you need.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default PermitRequest
