import { ReactNode } from "react";
import { useAtom } from "jotai";

import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

import "./App.css";
import { pageAtom } from "./modules/atom";

import Layout from "@/components/Layout";
import Clock from "@/components/Clock";
import Calculator from "@/components/Calculator";
import Todo from "@/components/Todo";
import Calendar from "@/components/Calendar";

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
