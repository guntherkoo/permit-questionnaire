'use client'

import { useEffect, useState } from 'react'
import {
  AddPermitEntryRequest,
  PermitStatusEnum,
  SurveyData,
  SurveyInitialData,
  WorkTypeEnum,
} from '@/app/utils/constants'
import { JobCheckList, PermitRequest, SelectWorkType } from './components'

interface SurveyProps {
  addPermitEntry(req: AddPermitEntryRequest): Promise<void>
}

const Survey = ({ addPermitEntry }: SurveyProps) => {
  const [surveyData, setSurveyData] = useState<SurveyData>(SurveyInitialData)
  const [disabledSubmitBtn, setDisableSubmitBtn] = useState<boolean>(true)
  const [verify, setVerify] = useState<boolean>(false)
  const [permitRequested, setPermitRequested] = useState<boolean>(false)

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyData({
      ...SurveyInitialData,
      workType: e.target.value as WorkTypeEnum,
    })

    // clear submit if already submitted
    setVerify(false)
  }

  const handleJobTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    jobType: 'interiorWork' | 'exteriorWork'
  ) => {
    // clear submit if already submitted
    if (verify) {
      setVerify(false)
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
    setVerify(true)
  }

  const handlePermitRequest = async (status: PermitStatusEnum) => {
    const { interiorWork, exteriorWork } = surveyData
    const jobList = [...interiorWork, ...exteriorWork]
      .filter((job) => job.checked)
      .map((job) => job.name)

    const permitEntryReq: AddPermitEntryRequest = {
      type: surveyData.workType,
      job_list: jobList,
      permit_status: status,
    }

    await addPermitEntry(permitEntryReq).then(() => setPermitRequested(true))
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
    <>
      <div className="flex flex-row gap-8">
        <form
          onSubmit={handleSubmit}
          className={`basis-6/12 ${
            permitRequested
              ? 'pointer-events-none opacity-25 transition-opacity duration-400'
              : ''
          }`}
        >
          <fieldset className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-white text-base">
                What residential work are you doing? 
              </h4>
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
              aria-label="Verify"
              type="submit"
              onClick={handleSubmit}
              disabled={disabledSubmitBtn}
              className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-6 text-lg text-white transition duration-400 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none disabled:text-blue-100"
            >
              Verify
            </button>
          </fieldset>
        </form>
        <PermitRequest
          verify={verify}
          surveyData={surveyData}
          handlePermitRequest={handlePermitRequest}
          permitRequested={permitRequested}
        />
      </div>
      {permitRequested && (
        <div className="flex justify-center items-center">
          <button
            aria-label="Request another permit"
            type="button"
            onClick={() => window.location.reload()}
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-lime-600 px-6 text-lg text-white transition duration-400 hover:bg-lime-500 focus:bg-lime-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-lime-300 disabled:bg-lime-300 disabled:shadow-none disabled:text-lime-100"
          >
            Request another permit
          </button>
        </div>
      )}
    </>
  )
}

export default Survey
