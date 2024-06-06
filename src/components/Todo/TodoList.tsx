import React, { useMemo } from 'react';
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
    handleSave: (id: string, newName: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleDone, handleDelete, handleSave }) => {
    const sortedTodos: Todo[] = useMemo(() => [...todos].sort((a: Todo, b: Todo): number => (a.done && !b.done
        ? 1 : b.done && !a.done ? -1 : 0)), [todos]);

    return (
        <Box>
            {sortedTodos.map((todo: Todo, index: number) => (
                <TodoItem
                    key={todo.id}
                    name={todo.name}
                    done={todo.done}
                    toggleDone={() => toggleDone(todo.id, !todo.done)}
                    handleDelete={() => handleDelete(todo.id)}
                    number={index + 1}
                    setName={(newName: string) => handleSave(todo.id, newName)}
                />
            ))}
        </Box>
    );
};

export default TodoList;
