import { Alert, AlertColor, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import React, { useEffect } from 'react';

type TransitionProps = Omit<SlideProps, 'direction'>;

export interface AlertProps {
    type: AlertColor;
    message: string;
}

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

const AlertCustom = (props: AlertProps) => {
    const [open, setOpen] = React.useState(true);
    const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(
        () => TransitionDown,
    );
    useEffect(() => {
        setOpen(true);
    }, [props]);
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            TransitionComponent={transition}
            key={transition ? transition.name : ''}
            onClose={() => setOpen(false)}
        >
            <Alert severity={props.type}>{props.message}</Alert>
        </Snackbar>
    );
};

export default AlertCustom;
