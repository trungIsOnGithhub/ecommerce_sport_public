import { styled, TextField, TextFieldProps } from '@mui/material';

export const TextFieldStyle = styled((props: TextFieldProps) => (
    <TextField
        {...props}
        variant="standard"
        InputLabelProps={{
            shrink: true,
            sx: {
                fontWeight: 700,
                color: 'black',
                fontSize: '18px',
                '&.Mui-focused': { color: (theme) => theme.color.main },
            },
        }}
        InputProps={{
            sx: {
                '&::after': { borderColor: (theme) => theme.color.main },
            },
        }}
    />
))(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginTop: '10px',
        width: '95%',
    },
}));
