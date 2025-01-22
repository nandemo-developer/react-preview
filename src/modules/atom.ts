import { atom } from "jotai";

//ページ
export const pageAtom = atom<0|1|2|3>(0)

//時計
export const dateAtom = atom<string>("1900/01/01")
export const timeAtom = atom<string>("00:00:00")