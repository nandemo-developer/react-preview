import { useEffectOnce } from "react-use"
import { dateAtom, timeAtom } from "@/modules/atom"
import { atom, useAtom } from "jotai"
import clsx from "clsx"

const intervalAtom = atom<number>(0)

export default function Clock() {
  const [intervalGetter, intervalSetter] = useAtom(intervalAtom)

  const [date, setDate] = useAtom(dateAtom)
  const [time, settime] = useAtom(timeAtom)

  useEffectOnce(() => {
    if (intervalGetter != 0) {
      clearInterval(intervalGetter)
      intervalSetter(0)
    }

    intervalSetter(window.setInterval(() => {
      const nowDateTime = new Date()
      const nowDate = String(nowDateTime.getFullYear()) + "/" +
        String(nowDateTime.getMonth() + 1).padStart(2, "0") + "/" +
        String(nowDateTime.getDate()).padStart(2, "0")

      const nowTime = String(nowDateTime.getHours()).padStart(2, "0") + ":" +
        String(nowDateTime.getMinutes()).padStart(2, "0") + ":" +
        String(nowDateTime.getSeconds()).padStart(2, "0")

      if (date != nowDate) setDate(nowDate)
      if (time != nowTime) settime(nowTime)

    }, 500))
  })

  return (
    <div className={layout}>
      <div className={cardLayout}>
        <div className={cardTitle}>
          {date}
        </div>
        <div className={cardBody}>
          {time}
        </div>
      </div>
    </div>
  )
}

//style
const layout = clsx([
  "flex", 
  "flex-col", 
  "justify-center", 
  "text-4xl", 
  "items-center", 
  "mt-10"
])

const cardLayout = clsx([
  "card", 
  "card-bordered", 
  "bg-slate-500", 
  "w-2/3", 
  "px-2", 
  "py-10",
  "text-white"
])

const cardTitle = clsx([
  "card-title", 
  "justify-center",
])

const cardBody = clsx([
  "card-body", 
  "justify-center", 
  "text-center", 
  "text-white", 
  "text-6xl", 
  "max-sm:text-3xl"
])