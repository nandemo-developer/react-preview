import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import clsx from "clsx"

interface todo{
  name: string
  category: string
  description: string
  endDate: string
  done: boolean
}

const todoListAtom = atomWithStorage<todo[]>("todolist",[])
const openAtom = atom<boolean>(false)
const newTodoAtom = atom<todo>({
  name: "",
  category: "",
  description: "",
  endDate: "",
  done: false
})

export default function Todo(){
  const [todoList, setTodoList] = useAtom(todoListAtom)
  const [open, setOpen] = useAtom(openAtom)

  function completeTodo(index: number){
    setTodoList((todoList) => {
      const newList = [...todoList]
      newList[index] = { ...newList[index], done: true}
      return newList
    })
  }

  function deleteTodo(index: number){
    setTodoList((todoList) => {
      const newList = [...todoList]
      newList.splice(index, 1)
      return newList
    })
  }

  return (
    <div className={todoLayout}>
      <div className={newTodoArea}>
        <button className={newButton} onClick={() => setOpen(!open)}>{ open ? "-" : "+" }</button>
      </div>
      { open ? <NewTodo onRegister={() => setOpen(false)} /> : <></> }
      {  todoList.map((todo, index) => 
        <div className={ todo.done ? "card card-bordered text-error-content bg-error" : "card card-bordered text-secondary-content bg-secondary"} key={index}>
          <div className="card-title p-5">
            <h1 className="w-full">{ todo.name } { todo.done ? <span>(完了)</span> : <></> }</h1>
          </div>
          <div className="flex flex-col text-wrap flex-wrap p-5 gap-y-5">
            <h1>分類：</h1>
            <p className="w-full">{todo.category}</p>
            <h1>説明：</h1>
            <p className="w-full text-wrap">{todo.description}</p>
            <h1>期限：</h1>
            <p className="w-full">{todo.endDate}</p>
            <div className="flex flex-row content-center gap-x-3 mx-auto">
              <button onClick={ () =>  completeTodo(index)} className="btn btn-primary w-[120px]">完了</button>
              <button onClick={ () =>  deleteTodo(index)} className="btn btn-primary w-[120px]">削除</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NewTodo({onRegister}:{onRegister:() => void}){
  const [newTodo, setNewTodo] = useAtom(newTodoAtom)
  const [todoList, setTodoList] = useAtom(todoListAtom)

  function register(){
    setTodoList([...todoList,newTodo])
    setNewTodo({
      name: "",
      category: "",
      description: "",
      endDate: "",
      done: false
    })
    onRegister()
  }

  return (
    <div className="card bg-slate-500 rounded-xl w-full h-[270px]">
      <div className="card-body px-2 py-5 w-full">
        <div className="flex flex-row-reverse items-center">
          <input 
            onChange={(e) => setNewTodo({
              ...newTodo,
              name: e.target.value
            })} 
            value={newTodo.name} 
            name="title" 
            type="text" 
            maxLength={10}
            className={newInput}
          />
          <label htmlFor="title" className="text-xs font-mono">名前：</label>
        </div>
        <div className="flex flex-row-reverse items-center">
          <input 
            onChange={(e) => setNewTodo({
              ...newTodo,
              category: e.target.value
            })} 
            value={newTodo.category} 
            name="title" 
            type="text" 
            maxLength={20}
            className={newInput}
          />
          <label htmlFor="category" className="text-xs font-mono">分類：</label>
        </div>
        <div className="flex flex-row-reverse items-start">
          <textarea 
            value={newTodo.description} 
            onChange={(e) => setNewTodo({
              ...newTodo,
              description: e.target.value
            })} 
            name="description" 
            maxLength={25}
            className=" w-5/6 textarea resize-none" 
          />
          <label htmlFor="description" className="text-xs font-mono">説明：</label>
        </div>
        <div className="flex flex-row-reverse items-center">
          <input 
            onChange={(e) => setNewTodo({
              ...newTodo,
              endDate: e.target.value
            })} 
            value={newTodo.endDate} 
            name="title" 
            type="text" 
            maxLength={10}
            className={newInput}
          />
          <label htmlFor="limit" className="text-xs font-mono">期限：</label>
        </div>
        <div className="card-actions justify-end">
          <button 
            onClick={() => register()} 
            className="btn btn-primary rounded-lg"
            disabled={newTodo.name == "" || newTodo.category == "" || newTodo.description == ""}
          >登録</button>
        </div>
      </div>
    </div>
  )
}

const todoLayout = clsx([
  "content-center mx-auto",
  "bg-primary",
  "flex flex-col gap-y-5",
  "h-full",
  "w-[640px] max-md:w-[320px]",
  "px-1 py-5"
])

const newTodoArea = clsx([
  "flex gap-x-2",
  "px-2",
  "flex-row-reverse",
  "content-end"
])

const newButton = clsx([
  "btn btn-secondary text-xl",
  "w-full"
])

const newInput = "w-5/6 input input-bordered h-[30px]"
