import { ReactNode } from "react";
import { atom, useAtom } from "jotai";

import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

import "./App.css";

import Layout from "@/Layout";
import Clock from "@/pages/Clock";
import Calculator from "@/pages/Calculator";
import Todo from "@/pages/Todo";
import Calendar from "@/pages/Calendar";

export const pageAtom = atom<0|1|2|3>(0)

function App() {
  const [page] = useAtom(pageAtom);
  let pageComponent: ReactNode;

  switch (page) {
    case 0:
      pageComponent = <Clock />;
      break;
    case 1:
      pageComponent = <Calculator />;
      break;
    case 2:
      pageComponent = <Todo />;
      break;
    case 3:
      pageComponent = <Calendar />;
      break;
    default:
      pageComponent = <></>;
  }

  return (
    <>
      <DevTools />
      <Layout>{pageComponent}</Layout>
    </>
  );
}

export default App;
