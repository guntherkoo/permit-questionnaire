import { Survey } from './components'

const Homepage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between p-24 gap-4">
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <h1 className="text-3xl">Residential Permit Verification</h1>
        <Survey />
      </div>
      <p className="text-sm text-white">
        Gunther Koo - SWE | Take Home Assignment
      </p>
    </main>
  )
}

export default Homepage
