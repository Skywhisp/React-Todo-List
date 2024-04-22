import { render } from "@testing-library/react";
import TodoList from "../../components/Todo/TodoList.tsx";
import '@testing-library/jest-dom';

test("корректно отображает список задач", () => {
    const todos = [
        { id: "1", name: "Погладить кошку", done: false },
        { id: "2", name: "Выгулять собаку", done: true },
        { id: "3", name: "Сделать покупки", done: false }
    ];

    const toggleDone = jest.fn();
    const handleDelete = jest.fn();
    const handleSave = jest.fn();

    const { getByText } = render(
        <TodoList todos={todos} toggleDone={toggleDone} handleDelete={handleDelete} handleSave={handleSave} />
    );

    expect(getByText("Погладить кошку")).toBeInTheDocument();
    expect(getByText("Выгулять собаку")).toBeInTheDocument();
    expect(getByText("Сделать покупки")).toBeInTheDocument();
});
