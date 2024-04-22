import { FormEvent, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./components/Todo/TodoForm.tsx";
import Summary from "./components/Summary/Summary.tsx";
import TodoList from "./components/Todo/TodoList.tsx";
import Header from "./components/Header.tsx";

const firebaseConfig = {
    apiKey: "AIzaSyCUivtHUxdML3ibn2M7owF5KJodjmPb3LU",
    authDomain: "react-todo-list-3686c.firebaseapp.com",
    projectId: "react-todo-list-3686c",
    storageBucket: "react-todo-list-3686c.appspot.com",
    messagingSenderId: "635350516091",
    appId: "1:635350516091:web:e644c66fd1d38892893dde"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export interface Todo {
    name: string;
    done: boolean;
    id: string;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, value: string) => {
        e.preventDefault();
        const newTodo = {
            name: value,
            done: false,
        };
        try {
            await db.collection("todos").add(newTodo);
            setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: uuidv4() }]);
        } catch (error) {
            console.error("Error adding todo: ", error);
        }
    };

    const toggleDoneTodo = async (id: string, done: boolean) => {
        try {
            await db.collection("todos").doc(id).update({ done: done });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, done: done } : todo
                )
            );
        } catch (error) {
            console.error("Error updating todo: ", error);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        try {
            await db.collection("todos").doc(id).delete();
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    const handleSaveTodo = async (id: string, newName: string) => {
        try {
            await db.collection("todos").doc(id).update({ name: newName });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, name: newName } : todo
                )
            );
        } catch (error) {
            console.error("Error updating todo name: ", error);
        }
    };

    const summaryTodos = useMemo(() => todos, [todos]);

    const redirectToGithub = () => {
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
