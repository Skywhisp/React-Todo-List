import React, { useState } from 'react';
import { Box, Checkbox, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface TodoItemProps {
    name: string;
    done: boolean;
    toggleDone: () => void;
    handleDelete: () => void;
    number: number;
    setName: (newName: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               name,
                                               done,
                                               toggleDone,
                                               handleDelete,
                                               number,
                                               setName
                                           }) => {

    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleToggleEdit = () => {
        if (editing) {
            setName(editedName);
        }
        setEditing(!editing);
    }

    const handleSave = () => {
        setName(editedName);
        setEditing(false);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
                borderBottom: '1px solid #ccc'
            }}
        >

            <label htmlFor={`todo-checkbox-${number}`}>

                <Box sx={{display: 'flex', alignItems: 'center'}}>

                    <Typography
                        sx={{
                            marginRight: '8px',
                            color: done ? '#888' : 'inherit'
                        }}
                    >
                        {number}.
                    </Typography>

                    <Checkbox
                        checked={done}
                        onChange={toggleDone}
                        sx={{marginRight: '8px'}}
                        id={`todo-checkbox-${number}`}
                    />

                    {editing ? (
                        <TextField
                            value={editedName}
                            onChange={e => setEditedName(e.target.value)}
                            fullWidth
                        />
                    ) : (
                        <Typography
                            sx={{
                                textDecoration: done ? 'line-through' : 'none',
                                color: done ? '#888' : 'inherit'
                            }}
                        >
                            {name}
                        </Typography>
                    )}

                </Box>

            </label>

            <Box sx={{display: 'flex'}}>

                <IconButton onClick={editing ? handleSave : handleToggleEdit}>
                    {editing ? <SaveIcon /> : <EditIcon />}
                </IconButton>

                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>

            </Box>

        </Box>
    );

};

export default TodoItem;
