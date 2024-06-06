import { FormEvent, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { db } from "./firebase/firebase.ts";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types/Todo.ts";
import Header from "./components/Header/Header.tsx";
import TodoForm from "./components/Todo/TodoForm.tsx";
import Summary from "./components/Summary/Summary.tsx";
import TodoList from "./components/Todo/TodoList.tsx";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                const snapshot = await db.collection("todos").get();
                const todosData: Todo[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Todo[];
                setTodos(todosData);
            } catch (error) {
                console.error("Error fetching todos: ", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, value: string): Promise<void> => {
        e.preventDefault();
        const newTodo = {
            name: value,
            done: false,
        };
        try {
            await db.collection("todos").add(newTodo);
            setTodos((prevTodos: Todo[]) => [...prevTodos, { ...newTodo, id: uuidv4() }]);
        } catch (error) {
            console.error("Error adding todo: ", error);
        }
    };

    const toggleDoneTodo = async (id: string, done: boolean): Promise<void> => {
        try {
            await db.collection("todos").doc(id).update({ done: done });
            setTodos((prevTodos: Todo[]) =>
                prevTodos.map((todo: Todo) =>
                    todo.id === id ? { ...todo, done: done } : todo
                )
            );
        } catch (error) {
            console.error("Error updating todo: ", error);
        }
    };

    const handleDeleteTodo = async (id: string): Promise<void> => {
        try {
            await db.collection("todos").doc(id).delete();
            setTodos((prevTodos: Todo[]) => prevTodos.filter((todo: Todo): boolean => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    const handleSaveTodo = async (id: string, newName: string): Promise<void> => {
        try {
            await db.collection("todos").doc(id).update({ name: newName });
            setTodos((prevTodos: Todo[]) =>
                prevTodos.map((todo: Todo) =>
                    todo.id === id ? { ...todo, name: newName } : todo
                )
            );
        } catch (error) {
            console.error("Error updating todo name: ", error);
        }
    };

    const summaryTodos: Todo[] = useMemo(() => todos, [todos]);

    const redirectToGithub = (): void => {
        window.location.href = "https://github.com/Skywhisp";
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                <TodoForm handleSubmit={handleSubmit} />
            </Grid>
            <Grid item>
                <Summary todos={summaryTodos} />
            </Grid>
            <Grid item>
                <TodoList
                    todos={todos}
                    toggleDone={toggleDoneTodo}
                    handleDelete={handleDeleteTodo}
                    handleSave={handleSaveTodo}
                />
            </Grid>
            <IconButton
                style={{ position: "fixed", bottom: 20, right: 20 }}
                onClick={redirectToGithub}
            >
                <GitHub />
            </IconButton>
        </Grid>
    );
}

export default App;
