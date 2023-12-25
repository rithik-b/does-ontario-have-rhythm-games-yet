import ArcadeCard from "@seethe/components/ArcadeCard"
import TimeElapsed from "@seethe/components/TimeElapsed"
import getFilteredArcades from "@seethe/utils/getFilteredArcades"

export const revalidate = 3600 // revalidate the data at most every hour

const Home = async () => {
  const filteredArcades = await getFilteredArcades()

  return (
    <main className="relative flex h-full flex-col justify-between gap-y-8 overflow-scroll px-5">
      <header className="mt-5">
        <h1 className="text-center text-5xl font-bold md:text-6xl">
          Does Ontario have non-dance rhythm games yet?
        </h1>
      </header>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {filteredArcades.arcades.map((arcade) => (
          <ArcadeCard arcade={arcade} key={arcade.id} />
        ))}
      </div>
      <footer className="mb-5 flex w-full flex-col items-center text-center">
        <div>
          Data Source -{" "}
          <a
            className="font-semibold hover:underline"
            href="https://zenius-i-vanisher.com/v5.2/arcades.php"
            target="_blank"
          >
            Zenius-I-Vanisher
          </a>
        </div>
        <TimeElapsed epochTime={filteredArcades.updatedAt} />
      </footer>
    </main>
  )
}

export default Home
