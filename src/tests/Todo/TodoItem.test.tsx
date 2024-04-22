import { render } from "@testing-library/react";
import TodoItem from "../../components/Todo/TodoItem.tsx";
import '@testing-library/jest-dom';

test('отображает элемент списка задач корректно', () => {
    const todo = {
        name: 'Тестовая задача',
        done: false,
        toggleDone: jest.fn(),
        handleDelete: jest.fn(),
        number: 1,
        setName: jest.fn(),
    };

    const { getByText } = render(<TodoItem {...todo} />);

    expect(getByText('Тестовая задача')).toBeInTheDocument();
});
