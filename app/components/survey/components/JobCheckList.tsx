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
  const jobTypeString = jobType
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase()

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-white text-base">
        What {jobTypeString} are you doing?
      </h4>
      <div className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-lg">
        {workType.map((job, index) => {
          return (
            <label
              htmlFor={job.name}
              key={`${job.name}-${index}`}
              className="relative flex flex-row gap-2 cursor-pointer rounded-lg bg-neutral-900 py-2 px-3 hover:bg-neutral-950 transition duration-400"
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
    </div>
  )
}

export default JobCheckList
