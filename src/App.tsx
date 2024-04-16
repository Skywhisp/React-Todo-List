import {FormEvent, useEffect, useState} from "react";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from 'uuid'
import TodoForm from "./components/Todo/TodoForm.tsx";
import Summary from "./components/Summary/Summary.tsx";
import TodoList from "./components/Todo/TodoList.tsx";

export interface Todo {
    name: string;
    done: boolean;
    id: string;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
        e.preventDefault();
        const newTodo = {
            name: value,
            done: false,
            id: uuidv4(),
        };
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const toggleDoneTodo = (id: string, done: boolean) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, done: done};
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const handleDeleteTodo = (id: string) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <TodoForm handleSubmit={handleSubmit} />
            </Grid>
            <Grid item>
                <Summary todos={todos} />
            </Grid>
            <Grid item>
                <TodoList
                    todos={todos}
                    toggleDone={toggleDoneTodo}
                    handleDelete={handleDeleteTodo}
                />
            </Grid>
        </Grid>
    );
}

export default App;
