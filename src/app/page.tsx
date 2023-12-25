import type {Machine, ZivResponse} from "@seethe/types/ZivResponse";

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
        "https://zenius-i-vanisher.com/api/arcades.php?action=query&country=Canada&skip_pictures=true&skip_visitors=true&skip_comments=true", {
            next: {revalidate: 3600}
        }
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
    <main className="relative justify-between flex flex-col h-full p-5 gap-y-5">
      <h1 className="text-4xl text-center">Does Ontario have non-dance rhythm games yet?</h1>
      <ul className="h-full">
        {filteredArcades.map((arcade) => (
          <li key={arcade.id}>
            <b>{arcade.name}</b>
            <ul>
              {arcade.machines.map((machine) => (
                <li key={machine.id}>{machine.game.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
        <footer className=" text-center">
            Data Source: <a className="text-blue-400" href="https://zenius-i-vanisher.com/v5.2/arcades.php">Zenius-I-Vanisher</a>
        </footer>
    </main>
  )
}

export default Home
