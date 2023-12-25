import { Select, MenuItem, FormControl, InputLabel, styled, SelectChangeEvent } from '@mui/material';
import { ReactNode, useId } from 'react';

interface SelectProps {
    name: string;
    value: any;
    handleChange: (event: SelectChangeEvent<unknown>) => void;
    children: ReactNode;
}

const FormControlStyle = styled(FormControl)(({ theme }) => ({
    width: '100%',
}));
const InputLabelStyle = styled(InputLabel)(({ theme }) => ({
    fontWeight: 700,
    color: 'black',
    fontSize: '18px',
    ['&.Mui-focused']: { color: theme.color.main },
}));

const SelectStyle = styled(Select)(({ theme }) => ({
    ['&::after']: { borderColor: theme.color.main },
}));

export const SelectField = ({ name, value, handleChange, children }: SelectProps) => {
    const id = useId();
    return (
        <FormControlStyle variant="standard">
            <InputLabelStyle shrink={true} id={id}>
                {name}
            </InputLabelStyle>
            <SelectStyle
                labelId={id}
                id="demo-simple-select-standard"
                value={value}
                onChange={handleChange}
                label="Tỉnh/Thành phố"
                defaultValue="0"
                required
            >
                <MenuItem value={0}>Không</MenuItem>
                {children}
            </SelectStyle>
        </FormControlStyle>
    );
};
