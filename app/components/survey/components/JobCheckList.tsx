import { Job } from '@/app/utils/constants'

interface JobCheckListProps {
  workType: Job[]
  handleJobTypeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    jobType: 'interiorWork' | 'exteriorWork'
  ) => void
  jobType: 'interiorWork' | 'exteriorWork'
}

const JobCheckList = ({
  workType,
  handleJobTypeChange,
  jobType,
}: JobCheckListProps) => {
  return (
    <div className="flex flex-col gap-2 bg-neutral-800 p-3 rounded-lg">
      {workType.map((job, index) => {
        return (
          <label
            htmlFor={job.name}
            key={`${job.name}-${index}`}
            className="relative flex flex-row gap-2 cursor-pointer rounded-lg bg-neutral-900 p-3"
          >
            <input
              id={job.name}
              type="checkbox"
              name={job.name}
              checked={job.checked}
              onChange={(e) => handleJobTypeChange(e, jobType)}
            />
            <span
              aria-hidden="true"
              className="hidden absolute inset-0 border-2 border-neutral-700 bg-neutral-950 bg-opacity-10 rounded-lg"
            />
            {job.name}
          </label>
        )
      })}
    </div>
  )
}

export default JobCheckList
