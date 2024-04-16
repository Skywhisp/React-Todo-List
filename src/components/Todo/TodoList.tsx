import React from 'react';
import { Box } from '@mui/material';
import TodoItem from './TodoItem';

interface Todo {
    name: string;
    done: boolean;
    id: string;
}

interface TodoListProps {
    todos: Todo[];
    toggleDone: (id: string, done: boolean) => void;
    handleDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleDone, handleDelete }) => {
    const sortedTodos = [...todos].sort((a, b) => (a.done && !b.done
        ? 1 : b.done && !a.done ? -1 : 0));

    return (
        <Box>
            {sortedTodos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    name={todo.name}
                    done={todo.done}
                    toggleDone={() => toggleDone(todo.id, !todo.done)}
                    handleDelete={() => handleDelete(todo.id)}
                    number={index + 1}
                />
            ))}
        </Box>
    );
};

export default TodoList;
