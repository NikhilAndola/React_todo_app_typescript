import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../types/model'
import "./styles.css"

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<Boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);


    const handleDone = (id: number) => {
        setTodos(todos.map((todo)=>todo.id=== id ? {...todo,isDone:!todo.isDone}:todo))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo)=>todo.id!==id))
    }

    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => 
            (todo.id===id?{...todo,todo:editTodo}:todo)
        ));
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <form className="todos__single" onSubmit={(e)=> handleEdit(e,todo.id)}>
            {
                edit ? (
                    <input
                    ref = {inputRef} 
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos__single--text"
                    />
                ): (
                    todo.isDone ? (
                        <s className="todos__single--text"> {todo.todo} </s>
                        ): (
                        <span className="todos__single--text"> {todo.todo} </span>
                        )
                )
            }
                

            <div>
                <span className="icon" onClick={()=>{
                    if(!edit && !todo.isDone){
                        setEdit(!edit);
                    }
                }}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>
                </span>

                <span className="icon" onClick={()=>handleDelete(todo.id)}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>  
                </span>
                 
                 <span className="icon" onClick={()=>handleDone(todo.id)}>
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                 </span>
            </div>
        </form>
    )
}

export default SingleTodo
