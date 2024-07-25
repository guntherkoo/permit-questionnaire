import { Survey } from './components'
import { AddPermitEntry } from '@/app/utils/supabase/actions'

const Homepage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between py-24 px-6 gap-4">
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">Request Residential Permit</h1>
          <h2 className="text-1xl">Please verify some information below:</h2>
        </div>
        <Survey AddPermitEntry={AddPermitEntry} />
      </div>
      <p className="text-sm text-white">
        Gunther Koo - SWE | Take Home Assignment
      </p>
    </main>
  )
}

export default Homepage
