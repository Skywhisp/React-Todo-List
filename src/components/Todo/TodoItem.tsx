import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoItemProps {
    name: string;
    done: boolean;
    toggleDone: () => void;
    handleDelete: () => void;
    number: number;
}

const TodoItem = ({
                      name,
                      done,
                      toggleDone,
                      handleDelete,
                      number,
                  }: TodoItemProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #ccc",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    sx={{
                        marginRight: "8px",
                        color: done ? "#888" : "inherit",
                    }}
                >
                    {number}.
                </Typography>
                <Checkbox
                    checked={done}
                    onChange={toggleDone}
                    sx={{ marginRight: "8px" }}
                />
                <Typography
                    sx={{
                        textDecoration: done ? "line-through" : "none",
                        color: done ? "#888" : "inherit",
                    }}
                >
                    {name}
                </Typography>
            </Box>
            <IconButton
                onClick={handleDelete}
                aria-label="delete"
                size="large"
                sx={{
                    marginLeft: "8px",
                    color: "#888",
                    "&:hover": {
                        color: "#f44336",
                    },
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default TodoItem;