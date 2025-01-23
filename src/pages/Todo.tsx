import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"

type todo = {
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
    <div className="grid grid-cols-1 gap-y-5 mt-5 w-[420px] max-sm:w-3/4 mx-auto">
      <div className="text-end">
        <Button onClick={() => setOpen(!open)} className="size-[40px] text-center bg-green-600">
          { open ? "-" : "+" }
        </Button>
      </div>
      { open ? <NewTodo onRegister={() => setOpen(false)} /> : <></> }
      {
        todoList.map((todo, index) => 
          <Card 
            key={index} 
            className={
              clsx([
                "w-[400px] max-sm:w-3/4 mx-auto bg-accent",
                { "bg-red-900" : todo.done }
              ])}
          >
            <CardHeader className="text-center">
              <CardTitle>{todo.name} { todo.done ? "(完了)" : "" }</CardTitle>
              <CardDescription>{todo.category}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>{todo.description}</p>
              <p>完了予定：{todo.endDate}</p>
            </CardContent>
            <CardFooter className="flex-row gap-x-8 gap-y-5  max-sm:flex-col">
              <Button onClick={ () =>  completeTodo(index)} className="bg-blue-500 w-[120px] max-sm:w-3/4 flex-1">完了</Button>
              <Button onClick={ () =>  deleteTodo(index)} className="bg-red-500 w-[80px] max-sm:w-3/4">削除</Button>
            </CardFooter>
          </Card>
        )
      }
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
    <Card className="w-[400px] max-sm:w-3/4 mx-auto bg-accent">
      <CardHeader className="text-center">
        <CardTitle>
          <Input 
            type="text" 
            className="text-md"
            placeholder="タイトル"
            value={newTodo.name}
            onChange={(e) => setNewTodo({
              ...newTodo,
              name: e.target.value
            })} 
          />
        </CardTitle>
        <CardDescription>
          <Input 
            type="text" 
            className="text-md"
            placeholder="カテゴリー"
            value={newTodo.category}
            onChange={(e) => setNewTodo({
              ...newTodo,
              category: e.target.value
            })} 
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
          <Input 
            type="text" 
            className="text-md"
            placeholder="説明"
            value={newTodo.description}
            onChange={(e) => setNewTodo({
              ...newTodo,
              description: e.target.value
            })} 
          />
          <Input 
            type="date" 
            className="text-md"
            placeholder="期限"
            value={newTodo.endDate}
            onChange={(e) => setNewTodo({
              ...newTodo,
              endDate: e.target.value
            })} 
          />
      </CardContent>
        <CardFooter className="flex-row-reverse">
          <Button onClick={ () =>  register()} className="bg-blue-500 w-[120px]">登録</Button>
        </CardFooter>
    </Card>
  )
}
