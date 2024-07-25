'use client'

import { useEffect, useState } from 'react'
import {
  SurveyData,
  SurveyInitialData,
  WorkTypeEnum,
} from '@/app/utils/constants'
import PermitRequirements from './components/PermitRequirements'
import JobCheckList from './components/JobCheckList'
import SelectWorkType from './components/SelectWorkType'

const Survey: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData>(SurveyInitialData)
  const [disabledSubmitBtn, setDisableSubmitBtn] = useState<boolean>(true)
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

  useEffect(() => {
    const { interiorWork, exteriorWork } = surveyData

    const enableSubmitBtn =
      interiorWork.some((job) => job.checked) ||
      exteriorWork.some((job) => job.checked)

    if (enableSubmitBtn) {
      setDisableSubmitBtn(false)
    } else {
      setDisableSubmitBtn(true)
    }
  }, [surveyData])

  return (
    <div className="flex flex-row gap-8">
      <form onSubmit={handleSubmit} className="basis-6/12">
        <fieldset className="flex flex-col gap-6">
          <div className="flex flex-row gap-5">
            <SelectWorkType
              type={WorkTypeEnum.INTERIOR}
              surveyData={surveyData}
              handleWorkTypeChange={handleWorkTypeChange}
            />

            <SelectWorkType
              type={WorkTypeEnum.EXTERIOR}
              surveyData={surveyData}
              handleWorkTypeChange={handleWorkTypeChange}
            />
          </div>

          {surveyData.workType === WorkTypeEnum.INTERIOR && (
            <JobCheckList
              workType={surveyData.interiorWork}
              handleJobTypeChange={handleJobTypeChange}
              jobType="interiorWork"
            />
          )}

          {surveyData.workType === WorkTypeEnum.EXTERIOR && (
            <JobCheckList
              workType={surveyData.exteriorWork}
              handleJobTypeChange={handleJobTypeChange}
              jobType="exteriorWork"
            />
          )}

          <button
            aria-label="Submit"
            type="submit"
            onClick={handleSubmit}
            disabled={disabledSubmitBtn}
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-6 text-lg text-white transition duration-400 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none disabled:text-blue-100"
          >
            Verify
          </button>
        </fieldset>
      </form>

      <div
        className={`flex flex-col gap-6 basis-6/12 bg-slate-800 p-6 rounded-lg border-2 transition duration-400 ${
          submit ? 'border-green-700' : 'border-blue-900 '
        }`}
      >
        <h2 className="text-xl">Permit Required:</h2>
        <hr className="opacity-20" />
        {submit ? (
          <PermitRequirements surveyData={surveyData} />
        ) : (
          <p className="text-neutral-300 font-light text-lg">
            ⬅️ Verify the work you need.
          </p>
        )}
      </div>
    </div>
  )
}

export default Survey
