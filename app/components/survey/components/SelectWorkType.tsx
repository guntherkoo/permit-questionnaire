import { SurveyData, WorkTypeEnum } from '@/app/utils/constants'

interface SelectWorkTypeProps {
  type: WorkTypeEnum
  surveyData: SurveyData
  handleWorkTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SelectWorkType = ({
  type,
  surveyData,
  handleWorkTypeChange,
}: SelectWorkTypeProps) => {
  const selectId = type
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  return (
    <label
      htmlFor={selectId}
      className="relative flex flex-row items-center bg-white/10 p-6 rounded-lg shadow-md cursor-pointer"
    >
      <input
        id={selectId}
        type="radio"
        name={selectId}
        value={type}
        checked={surveyData.workType === type}
        onChange={handleWorkTypeChange}
      />
      <span
        aria-hidden="true"
        className="hidden absolute inset-0 border-2 border-blue-500 bg-blue-200 bg-opacity-10 rounded-lg"
      />
      <span className="text-white text-xl pl-2">{type}</span>
    </label>
  )
}

export default SelectWorkType
