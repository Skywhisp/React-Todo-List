import { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import SummaryItem from './SummaryItem.tsx';
import { Todo } from "../../App.tsx";

const Summary = ({ todos }: { todos: Todo[] }) => {
    const summaryValues = useMemo(() => {
        const total = todos.length;
        const pending = todos.filter((t) => !t.done).length;
        const done = todos.filter((t) => t.done).length;
        return { total, pending, done };
    }, [todos]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <Box maxWidth="600px">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <SummaryItem itemName="Всего задач" itemValue={summaryValues.total} />
                    </Grid>
                    <Grid item>
                        <SummaryItem itemName="Нужно сделать" itemValue={summaryValues.pending} />
                    </Grid>
                    <Grid item>
                        <SummaryItem itemName="Сделано" itemValue={summaryValues.done} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Summary;
