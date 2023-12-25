import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';

const DateTimeField = ({ date, onChange, name, label }: { date: any; onChange: any; name: any; label: any }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    label={label}
                    renderInput={(props) => <TextField className="Date" {...props} name={name} />}
                    ampm={false}
                    inputFormat="DD/MM/YYYY HH:mm"
                    onError={() => null}
                    onChange={(newvalue) => onChange(newvalue, name)}
                    value={date}
                    className="Date"
                    views={['year', 'month', 'day', 'hours']}
                    disablePast
                />
            </LocalizationProvider>
        </>
    );
};

export default DateTimeField;
