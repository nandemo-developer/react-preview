import { ReactNode } from "react";
import { useSetAtom } from "jotai";
import clsx from "clsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pageAtom } from "@/App";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={
        clsx([
          "h-full", 
          "pt-[60px]", 
          "pb-[60px]", 
          "my-0"
        ])
      }>
        {children}
      </main>
      <Footer />
    </>
  )
}

function Header() {
  const pageSetter = useSetAtom(pageAtom)

  return (
    <header className={
      clsx([
        "fixed", 
        "w-full",
        "h-[60px]", 
        "bg-secondary", 
        "text-center", 
        "top-0"
      ])}
    >
      <Tabs defaultValue="0" className="w-full mt-2">
        <TabsList>
          <TabsTrigger value="0" onClick={() => pageSetter(0)}>時計</TabsTrigger>
          <TabsTrigger value="1" onClick={() => pageSetter(1)}>計算機</TabsTrigger>
          <TabsTrigger value="2" onClick={() => pageSetter(2)}>TODO</TabsTrigger>
          <TabsTrigger value="3" onClick={() => pageSetter(3)}>カレンダー</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  )
}

function Footer() {
  return (
    <footer className={
      clsx([
        "fixed",
        "w-full",
        "h-[60px]", 
        "bg-secondary", 
        "justify-center", "bottom-0"
      ])} 
    />
  )
}