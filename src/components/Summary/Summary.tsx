import { Box, Grid } from '@mui/material';
import SummaryItem from './SummaryItem.tsx';
import { Todo } from "../../App.tsx";

const Summary = ({ todos }: { todos: Todo[] }) => {
    const total = todos.length;
    const pending = todos.filter((t) => !t.done).length;
    const done = todos.filter((t) => t.done).length;

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <Box maxWidth="600px">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <SummaryItem itemName="Всего задач" itemValue={total} />
                    </Grid>
                    <Grid item>
                        <SummaryItem itemName="Нужно сделать" itemValue={pending} />
                    </Grid>
                    <Grid item>
                        <SummaryItem itemName="Сделано" itemValue={done} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Summary;