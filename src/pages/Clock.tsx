import { atom, useAtom } from "jotai"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const intervalAtom = atom<number>(0)

const dateAtom = atom<string>("1900/01/01")
const timeAtom = atom<string>("00:00:00")
const youbiAtom = atom<string>("曜日")

export default function Clock() {
  const [intervalGetter] = useAtom(intervalAtom)

  const [date, setDate] = useAtom(dateAtom)
  const [time, settime] = useAtom(timeAtom)
  const [youbi, setYoubi] = useAtom(youbiAtom)

  const dayList = ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"]

  intervalAtom.onMount = (setAtom) => {
    if (intervalGetter != 0) {
      clearInterval(intervalGetter)
      setAtom(0)
    }

    setAtom(window.setInterval(() => {
      const nowDateTime = new Date()
      const nowDate = String(nowDateTime.getFullYear()) + "/" +
        String(nowDateTime.getMonth() + 1).padStart(2, "0") + "/" +
        String(nowDateTime.getDate()).padStart(2, "0")

      const nowTime = String(nowDateTime.getHours()).padStart(2, "0") + ":" +
        String(nowDateTime.getMinutes()).padStart(2, "0") + ":" +
        String(nowDateTime.getSeconds()).padStart(2, "0")

      const nowYoubi = dayList[nowDateTime.getDay()]

      if (date != nowDate) setDate(nowDate)
      if (time != nowTime) settime(nowTime)
      if (youbi != nowYoubi) setYoubi(nowYoubi)

    }, 500))
  }

  return (
    <div className="justify-center mt-5 w-full">
      <Card className="w-[400px] mx-auto bg-accent">
        <CardHeader className="text-center">
          <CardTitle>{time}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>{youbi}</p>
        </CardContent>
      </Card>
    </div>
  )
}