import { atom, useAtom } from "jotai"
import { Calendar as ShadcnCalender } from "@/components/ui/calendar"

const calendarDateAtom = atom<Date|undefined>(new Date())

export default function Calendar(){
  const [date, setDate] = useAtom(calendarDateAtom)
  return (
    <div className='justify-center w-[340px] mx-auto mt-5'>
      <ShadcnCalender
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border bg-slate-800 [&>div]:justify-center"
      />
    </div>
  )
}