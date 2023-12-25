import { useState } from 'react';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackdropCustom() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
