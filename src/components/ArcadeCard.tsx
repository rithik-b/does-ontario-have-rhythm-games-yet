import { type Arcade } from "@seethe/types/ZivResponse"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@seethe/components/ui/card"
import TimeElapsed from "@seethe/components/TimeElapsed"

interface Props {
  arcade: Arcade
}

const ArcadeCard = ({ arcade }: Props) => {
  const lastUpdated = new Date(arcade.lastUpdateTime).getTime()
  return (
    <Card className="w-full md:w-fit">
      <CardHeader>
        <a
          href={`https://zenius-i-vanisher.com/v5.2/arcade.php?id=${arcade.id}`}
          className="hover:underline"
          target="_blank"
        >
          <CardTitle>{arcade.name}</CardTitle>
          <CardDescription>{arcade.address}</CardDescription>
        </a>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc">
          {arcade.machines.map((machine) => (
            <li key={machine.id}>{machine.game.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TimeElapsed epochTime={lastUpdated} />
      </CardFooter>
    </Card>
  )
}

export default ArcadeCard
