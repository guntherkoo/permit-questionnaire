import { Survey } from './components'

const Homepage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Residential Permit Survey</h1>
        <Survey />
      </div>
    </main>
  )
}

export default Homepage
