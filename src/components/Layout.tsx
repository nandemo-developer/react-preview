import { ReactNode } from "react";
import { useAtom } from "jotai";
import clsx from "clsx";
import { pageAtom } from "@/modules/atom";

export default function Layout({children}:{children:ReactNode}){
  return (
    <>
      <Header/>
      <main className="flex-grow">
        { children }
      </main>
      <Footer/>
    </>
  )
}

function Header(){
  const [page, pageSetter] = useAtom(pageAtom)

  return (
    <header className={clsx([barLayout , "h-[70px] justify-center"])}>
      <button className={ clsx(["btn btn-ghost text-md", { "text-success" :  page == 0}])} onClick={() => pageSetter(0)}>時計</button>
      <button className={ clsx(["btn btn-ghost text-md", { "text-success" :  page == 1}])} onClick={() => pageSetter(1)}>計算機</button>
      <button className={ clsx(["btn btn-ghost text-md", { "text-success" :  page == 2}])} onClick={() => pageSetter(2)}>TODO</button>
      <button className={ clsx(["btn btn-ghost text-md", { "text-success" :  page == 3}])} onClick={() => pageSetter(3)}>カレンダー</button>
    </header>
  )
}

function Footer(){

  return (
    <footer className={clsx([barLayout , "h-[50px]"])}/>
  )
}

const barLayout = "navbar w-full bg-warning text-warning-content p-0 z-50"