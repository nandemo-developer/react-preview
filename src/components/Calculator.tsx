import { useRef } from "react";
import { atom, useAtom } from "jotai";
import clsx from "clsx"

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

  return (
    <div className={calculatorLayout}>
      <div className={inputRow}>
        <input
          type="text"
          name="calc-result"
          value={!calc.enable || value2 == "0" ? value1 : value2}
          className={clsx([inputResult, calcurated ? "text-green-400" : "text-white"])}
          maxLength={25}
          readOnly
        />
      </div>
      <div className={buttonRow}>
        <CalcuratorButton btnType="none" />
        <CalcuratorButton btnType="none" />
        <CalcuratorButton btnType="calc" text="C" onClick={() => clear()} />
        <CalcuratorButton btnType="calc" text="÷" onClick={() => enableCalc("÷")} />
      </div>
      <div className={buttonRow}>
        <CalcuratorButton btnType="number" text="7" onClick={() => addValue("7")} />
        <CalcuratorButton btnType="number" text="8" onClick={() => addValue("8")} />
        <CalcuratorButton btnType="number" text="9" onClick={() => addValue("9")} />
        <CalcuratorButton btnType="calc" text="x" onClick={() => enableCalc("x")} />
      </div>
      <div className={buttonRow}>
        <CalcuratorButton btnType="number" text="4" onClick={() => addValue("4")} />
        <CalcuratorButton btnType="number" text="5" onClick={() => addValue("5")} />
        <CalcuratorButton btnType="number" text="6" onClick={() => addValue("6")} />
        <CalcuratorButton btnType="calc" text="-" onClick={() => enableCalc("-")} />
      </div>
      <div className={buttonRow}>
        <CalcuratorButton btnType="number" text="1" onClick={() => addValue("1")} />
        <CalcuratorButton btnType="number" text="2" onClick={() => addValue("2")} />
        <CalcuratorButton btnType="number" text="3" onClick={() => addValue("3")} />
        <CalcuratorButton btnType="calc" text="+" onClick={() => enableCalc("+")} />
      </div>
      <div className={buttonRow}>
        <CalcuratorButton btnType="number" text="+/-" onClick={() => revert()} />
        <CalcuratorButton btnType="number" text="." onClick={() => addValue(".") } />
        <CalcuratorButton btnType="number" text="0" onClick={() => addValue("0")} />
        <CalcuratorButton btnType="calc" text="=" onClick={() => runCalc()}/>
      </div>
    </div>
  );
}

function CalcuratorButton(
  props: {
    btnType: "number" | "calc" | "none",
    text?: string,
    onClick?: () => void;
  }) {
  const typeColor = useRef("btn-disabled")
  if (props.btnType == "number") {
    typeColor.current = "btn-info"
  } else if (props.btnType == "calc") {
    typeColor.current = "btn-warning"
  }

  return (
    <>
      <button
        className={clsx([buttonStyle, typeColor.current])}
        disabled={props.btnType == "none"}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  )
}

//style
const calculatorLayout = clsx([
  "mx-auto",
  "border rounded-lg bg-slate-600",
  "mt-2",
  "flex flex-col gap-y-5",
  "items-start",
  "h-[450px]",
  "w-[300px]",
  "content-center",
  "px-1 py-5 mx-auto"
])

const inputResult = clsx([
  "input",
  "input-bordered",
  "rounded-lg",
  "w-full",
  "max-w-xs",
  "text-end",
  "text-2xl"
])

const inputRow = "col-span-4"
const buttonRow = clsx([
  "flex flex-row",
  "gap-x-2",
  "mx-auto",
  "content-center",
  "items-center"
])
const buttonStyle = clsx([
  "btn",
  "rounded-md",
  "w-[65px] h-[20px] p-0",
  "text-white",
  "text-xl"
])