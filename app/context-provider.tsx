'use client'

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { SurveyData, SurveyInitialData } from './utils/constants'

interface SurveyContextProps {
  surveyData: SurveyData
  setSurveyData: Dispatch<SetStateAction<SurveyData>>
}

export const SurveyContext = createContext<SurveyContextProps | undefined>(
  undefined
)

const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [surveyData, setSurveyData] = useState<SurveyData>(SurveyInitialData)

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData }}>
      {children}
    </SurveyContext.Provider>
  )
}

export default SurveyProvider
