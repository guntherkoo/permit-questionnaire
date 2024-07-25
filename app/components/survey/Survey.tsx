'use client'

import {
  ExteriorWorkEnum,
  InteriorWorkEnum,
  SurveyData,
  WorkTypeEnum,
} from '@/app/utils/constants'
import { useState } from 'react'
import PermitRequirements from './components/PermitRequirements'

const SurveyInitialData: SurveyData = {
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

const Survey: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData>(SurveyInitialData)
  const [submit, setSubmit] = useState<boolean>(false)

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyData({
      ...SurveyInitialData,
      workType: e.target.value as WorkTypeEnum,
    })

    // clear submit if already submitted
    setSubmit(false)
  }

  const handleJobTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    jobType: 'interiorWork' | 'exteriorWork'
  ) => {
    // clear submit if already submitted
    if (submit) {
      setSubmit(false)
    }

    const updatedCheckboxes = surveyData[jobType].map((checkbox) =>
      checkbox.name === e.target.name
        ? { ...checkbox, checked: e.target.checked }
        : checkbox
    )

    setSurveyData({
      ...surveyData,
      [jobType]: updatedCheckboxes,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(surveyData)
    setSubmit(true)
  }

  const enableSubmitBtn =
    surveyData.interiorWork.some((job) => job.checked) ||
    surveyData.exteriorWork.some((job) => job.checked)

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-row gap-5">
          <label htmlFor="interior-work" className="cursor-pointer">
            <input
              id="interior-work"
              type="radio"
              name="interior-work"
              value={WorkTypeEnum.INTERIOR}
              checked={surveyData.workType === WorkTypeEnum.INTERIOR}
              onChange={handleWorkTypeChange}
            />
            <span className="text-white text-xl pl-2">
              {WorkTypeEnum.INTERIOR}
            </span>
          </label>
          <label htmlFor="exterior-work" className="cursor-pointer">
            <input
              id="exterior-work"
              type="radio"
              name="exterior-work"
              value={WorkTypeEnum.EXTERIOR}
              checked={surveyData.workType === WorkTypeEnum.EXTERIOR}
              onChange={handleWorkTypeChange}
            />
            <span className="text-white text-xl pl-2">
              {WorkTypeEnum.EXTERIOR}
            </span>
          </label>
        </div>

        {surveyData.workType === WorkTypeEnum.INTERIOR && (
          <div className="flex flex-col gap-5">
            {surveyData.interiorWork.map((job, index) => {
              return (
                <label
                  htmlFor={job.name}
                  key={`${job.name}-${index}`}
                  className="flex flex-row gap-2 cursor-pointer"
                >
                  <input
                    id={job.name}
                    type="checkbox"
                    name={job.name}
                    checked={job.checked}
                    onChange={(e) => handleJobTypeChange(e, 'interiorWork')}
                  />
                  {job.name}
                </label>
              )
            })}
          </div>
        )}

        {surveyData.workType === WorkTypeEnum.EXTERIOR && (
          <div className="flex flex-col gap-5">
            {surveyData.exteriorWork.map((job, index) => {
              return (
                <label
                  htmlFor={job.name}
                  key={`${job.name}-${index}`}
                  className="flex flex-row gap-2 cursor-pointer"
                >
                  <input
                    id={job.name}
                    type="checkbox"
                    name={job.name}
                    checked={job.checked}
                    onChange={(e) => handleJobTypeChange(e, 'exteriorWork')}
                  />
                  {job.name}
                </label>
              )
            })}
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!enableSubmitBtn}
          className="disabled:cursor-not-allowed disabled:text-slate-500"
        >
          Submit
        </button>
      </form>

      {submit && <PermitRequirements surveyData={surveyData} />}
    </div>
  )
}

export default Survey
