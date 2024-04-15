import React, { FormEvent, useState } from "react";
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const TodoForm = ({
                      handleSubmit,
                  }: {
    handleSubmit: (e: FormEvent<HTMLFormElement>, value: string) => void;
}) => {
    const [newTodoName, setNewTodoName] = useState("");
    const [error, setError] = useState(false);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodoName.trim() === "") {
            setError(true);
        } else {
            handleSubmit(e, newTodoName);
            setNewTodoName("");
            setError(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoName(e.target.value);
        setError(false);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <Box maxWidth="600px">
                <FormControl component="form" onSubmit={handleFormSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                id="todo-input"
                                value={newTodoName}
                                onChange={handleInputChange}
                                label="Напишите задачу"
                                placeholder="Купить хлеб"
                                variant="outlined"
                                fullWidth
                                error={error}
                                helperText={error ? "Введите название задачи" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                endIcon={<AddIcon />}
                                fullWidth
                            >
                                Добавить задачу
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
        </Box>
    );
};

export default TodoForm;