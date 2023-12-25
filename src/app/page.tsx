import type { Machine, ZivResponse } from "@seethe/types/ZivResponse"
import ArcadeCard from "@seethe/components/ArcadeCard"

const danceGames = [
  "dancemania",
  "stepmania",
  "dancedancerevolution",
  "dance dance revolution",
  "in the groove",
  "pump it up",
]

const machineFilter = (machine: Machine) =>
  machine.game.genre === "Music Game" &&
  !danceGames.some((game) => machine.game.name.toLowerCase().includes(game))

const getFilteredArcades = async () => {
  const zivResponse = await fetch(
    "https://zenius-i-vanisher.com/api/arcades.php?action=query&country=Canada&skip_pictures=true&skip_visitors=true&skip_comments=true",
    {
      next: { revalidate: 3600 },
    },
  ).then((res) => res.json() as Promise<ZivResponse>)
  const arcades = zivResponse.arcades.filter(
    (arcade) =>
      arcade.subregion === "Ontario" && arcade.machines.some(machineFilter),
  )
  for (const arcade of arcades) {
    arcade.machines = arcade.machines.filter(machineFilter)
  }
  return arcades
}

const Home = async () => {
  const filteredArcades = await getFilteredArcades()

  return (
    <main className="relative flex h-full flex-col justify-between gap-y-10 p-5 md:p-10">
      <h1 className="text-center text-5xl font-semibold md:text-6xl">
        Does Ontario have non-dance rhythm games yet?
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {filteredArcades.map((arcade) => (
          <ArcadeCard arcade={arcade} key={arcade.id} />
        ))}
      </div>
      <footer className="text-center">
        Data Source:{" "}
        <a
          className="font-medium hover:underline"
          href="https://zenius-i-vanisher.com/v5.2/arcades.php"
          target="_blank"
        >
          Zenius-I-Vanisher
        </a>
      </footer>
    </main>
  )
}

export default Home
