import { atom, useAtom } from "jotai";
import clsx from "clsx";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const valueAtom1 = atom<string>("0")
const valueAtomNumber1 = atom((get) => parseFloat(get(valueAtom1)))
const valueAtom2 = atom<string>("0")
const valueAtomNumber2 = atom((get) => parseFloat(get(valueAtom2)))

const calcAtom = atom<{ enable: boolean, mode: "+" | "-" | "x" | "÷" | null }>({
  enable: false,
  mode: null
})

const calcuratedAtom = atom<boolean>(false)
const dotAtom = atom<"enable" | "dotted">("enable")


export default function Calculator() {
  const [value1, setValue1] = useAtom(valueAtom1)
  const [value1Number] = useAtom(valueAtomNumber1)
  const [value2, setValue2] = useAtom(valueAtom2)
  const [value2Number] = useAtom(valueAtomNumber2)

  const [calc, setCalc] = useAtom(calcAtom)
  const [calcurated, setCalcurated] = useAtom(calcuratedAtom)
  const [dotFlg, setDotFlg] = useAtom(dotAtom)

  function addValue(value: string) {
    let count = !calc.enable ? value1 : value2

    if(calcurated){
      count = "0"
      setCalcurated(false)
    }

    if(count.length > 15){
      return
    }

    if(count == "0" && value == "0"){
      return
    }else if(count == "0" && value != "0" && value != "."){
      count = ""
    }

    if(value == "." && dotFlg == "dotted"){
      return
    }

    if(value == "."){
      setDotFlg("dotted")
    }

    if(!calc.enable){
      setValue1(count + value)
    }else{
      setValue2(count + value)
    }
  }

  function enableCalc(method: "+" | "-" | "x" | "÷" | null) {
    if(value1 == "0" && value2 == "0")return
    setCalc({ enable: method ? true : false, mode: method })
    setDotFlg("enable")
  }

  function runCalc(){
    if(!calc.enable) return

    if(calc.mode == "+"){
      setValue1(String(value1Number + value2Number))
    }else if(calc.mode == "-"){
      setValue1(String(value1Number - value2Number))
    }else if(calc.mode == "x"){
      setValue1(String(value1Number * value2Number))
    }else if(calc.mode == "÷"){
      setValue1(String(value1Number / value2Number))
    }else{
      return
    }

    setValue2("0")
    setCalc({ enable: false, mode: null })
    setCalcurated(true)
  }

  function clear() {
    setValue1("0")
    setValue2("0")
    setCalc({ enable: false, mode: null })
    setCalcurated(false)
    setDotFlg("enable")
  }

  function revert() {
    if(!calc.enable && value1 == "0"){
      setValue1(String(value1Number * -1))
    }else if(calc.enable && value2 == "0"){
      setValue2(String(value2Number * -1))
    }
  }

  type btn = {
    value: string
    type: string
    onClick: () => void
  }
  const btnList:btn[] = [
    //1行目
    { value: "", type: buttonStyleDisabled, onClick: () => {} },
    { value: "", type: buttonStyleDisabled, onClick: () => {} },
    { value: "C", type: buttonStyleCalc, onClick: () => clear() },
    { value: "÷", type: buttonStyleCalc, onClick: () => enableCalc("÷") },
    //2行目
    { value: "7", type: buttonStyle, onClick: () => addValue("7") },
    { value: "8", type: buttonStyle, onClick: () => addValue("8") },
    { value: "9", type: buttonStyle, onClick: () => addValue("9") },
    { value: "x", type: buttonStyleCalc, onClick: () => enableCalc("x") },
    //3行目
    { value: "4", type: buttonStyle, onClick: () => addValue("4") },
    { value: "5", type: buttonStyle, onClick: () => addValue("5") },
    { value: "6", type: buttonStyle, onClick: () => addValue("6") },
    { value: "-", type: buttonStyleCalc, onClick: () => enableCalc("-") },
    //4行目
    { value: "1", type: buttonStyle, onClick: () => addValue("4") },
    { value: "2", type: buttonStyle, onClick: () => addValue("5") },
    { value: "3", type: buttonStyle, onClick: () => addValue("6") },
    { value: "+", type: buttonStyleCalc, onClick: () => enableCalc("+") },
    //5行目
    { value: "+/-", type: buttonStyleCalc, onClick: () => revert() },
    { value: "0", type: buttonStyle, onClick: () => addValue("0") },
    { value: ".", type: buttonStyle, onClick: () => addValue(".") },
    { value: "=", type: buttonStyleCalc, onClick: () => runCalc() },
  ]

  return (
    <div className="justify-center mt-5 w-full">
      <Card className="w-[360px] mx-auto bg-zinc-500 pb-16">
        <CardContent className="text-center">
          <Input 
            type="text" 
            className={
              clsx([
                "text-end font-mono my-5 mb-10 h-[60px] pointer-events-none",
                {"text-green-500": calcurated}
              ])} 
            value={!calc.enable || value2 == "0" ? value1 : value2}
            readOnly
          />
          <div className="grid grid-cols-4 gap-x-2 gap-y-8">
            {
              btnList.map(
                (btn,index) =>  
                  <Button key={index} className={ btn.type } onClick={btn.onClick}>
                    {btn.value}
                  </Button>
              )
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

//style
const buttonStyle = "bg-blue-500 text-white h-[50px] w-[70px]"
const buttonStyleDisabled = buttonStyle + " bg-slate-800"
const buttonStyleCalc = buttonStyle + " bg-yellow-600"