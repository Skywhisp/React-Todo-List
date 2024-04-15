import {FormEvent, useState} from "react";
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
        e.preventDefault();
        const newTodo = {
            name: value,
            done: false,
            id: uuidv4(),
        };
        setTodos((todos) => [...todos, newTodo]);
    };

    const toggleDoneTodo = (id: string, done: boolean) => {
        setTodos((todos) =>
            todos.map((t) => {
                if (t.id === id) {
                    t.done = done;
                }
                return t;
            })
        );
    };

    const handleDeleteTodo = (id: string) => {
        setTodos((todos) => todos.filter((t) => t.id !== id));
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