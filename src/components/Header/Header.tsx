import React from 'react';
import { Typography } from '@mui/material';

const Header: React.FC = () => {
    return (
        <div>
                <Typography marginTop="15px" variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Список дел
                </Typography>
        </div>
    );
};

export default Header;
