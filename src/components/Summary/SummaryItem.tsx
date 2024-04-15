import { Box, Typography } from "@mui/material";

const SummaryItem = ({ itemName, itemValue }: { itemName: string; itemValue: number; }) => {
    return (
        <Box textAlign="center" >
            <Typography variant="h6" component="h2" gutterBottom>{itemName}</Typography>
            <Typography variant="body1" component="span">{itemValue}</Typography>
        </Box>
    );
};

export default SummaryItem;