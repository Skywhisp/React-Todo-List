import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TodoForm from "../../components/Todo/TodoForm.tsx";

test("отправка формы с пустым вводом отображает сообщение об ошибке", () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<TodoForm handleSubmit={handleSubmit} />);

    const addButton = getByText("Добавить задачу");
    fireEvent.click(addButton);

    expect(handleSubmit).not.toBeCalled();
    expect(getByText("Введите название задачи")).toBeInTheDocument();
});

test("отправка формы с допустимым вводом вызывает handleSubmit", () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<TodoForm handleSubmit={handleSubmit} />);

    const input = getByLabelText("Напишите задачу");
    const addButton = getByText("Добавить задачу");

    fireEvent.change(input, { target: { value: "Купить хлеб" } });
    fireEvent.click(addButton);

    expect(handleSubmit).toBeCalledWith(expect.anything(), "Купить хлеб");
});

test("очищает сообщение об ошибке после успешной отправки формы", () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(<TodoForm handleSubmit={handleSubmit} />);

    const addButton = getByText("Добавить задачу");
    fireEvent.click(addButton);

    expect(queryByText("Введите название задачи")).toBeInTheDocument();

    fireEvent.change(getByLabelText("Напишите задачу"), { target: { value: "Купить хлеб" } });
    fireEvent.click(addButton);

    expect(queryByText("Введите название задачи")).toBeNull();
});
