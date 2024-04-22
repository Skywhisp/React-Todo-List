import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

interface SummaryItemProps {
    itemName: string;
    itemValue: number;
}

const SummaryItem: React.FC<SummaryItemProps> = React.memo(({ itemName, itemValue }) => {
    const memoizedTypography = useMemo(() => (
        <>
            <Typography variant="h6" component="h2" gutterBottom>{itemName}</Typography>
            <Typography variant="body1" component="span">{itemValue}</Typography>
        </>
    ), [itemName, itemValue]);

    return (
        <Box textAlign="center">
            {memoizedTypography}
        </Box>
    );
});

export default SummaryItem;
