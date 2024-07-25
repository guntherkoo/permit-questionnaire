import { Job } from './constants'

export const permitProcesslogic = (
  workTypeJobs: Job[],
  condition: (job: Job) => void
) => {
  const filterJobs = workTypeJobs.filter((job) => job.checked && condition(job))

  return filterJobs.length > 0 ? true : false
}
