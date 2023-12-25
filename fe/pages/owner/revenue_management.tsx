import { ReactElement, useState, useEffect, JSXElementConstructor } from 'react';
import { Box, MenuItem, styled, SelectChangeEvent, TextFieldProps, TextField, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import { BoxContainStyles } from '../../components/boxcontain';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import { SelectField } from '../../components/select';
import stadiumService from '../../services/stadiumService';

import orderService from '../../services/orderService';
import { BarChart, LineChart, TotalCard, AmountCard } from '../../feature/revenueManagement';

const BoxFormControlStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0.6',
    gap: 10,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
    },
}));

const User: NextPageWithLayout = () => {
    const [stadiums, setStadiums] = useState([]);
    const [stdCurr, setStdCurr] = useState('');
    const [yearCurr, setYearCurr] = useState(moment());
    const [data, setData] = useState([]);
    useEffect(() => {
        const getStadiums = async () => {
            const stadiums = await stadiumService.getStadiumOfOwner();
            const stdData = stadiums.data.data.stadiums;
            if (stdData.length === 0) return;
            setStadiums(stadiums.data.data.stadiums);
            setStdCurr(stadiums.data.data.stadiums[0]._id);
        };
        getStadiums();
    }, []);

    useEffect(() => {
        const getStatMonthly = async () => {
            const res = await orderService.getStatMonthly(stdCurr, yearCurr.year());
            if (res.data) {
                setData(res.data.stat);
            }
        };
        getStatMonthly();
    }, [stdCurr, yearCurr]);

    const handleChangeStd = (e: SelectChangeEvent<unknown>) => {
        setStdCurr(e.target.value as string);
    };
    return (
        <BoxContainStyles>
            <TypographyHeading2Style>Quản lí doanh thu</TypographyHeading2Style>
            <Box sx={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between' }}>
                <BoxFormControlStyle>
                    <SelectField name="Sân chính" value={stdCurr} handleChange={handleChangeStd}>
                        {stadiums.map((stadium: any) => (
                            <MenuItem key={stadium._id} value={stadium._id}>
                                {stadium.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            views={['year']}
                            label="Năm"
                            value={yearCurr}
                            onChange={(newValue) => setYearCurr(newValue as any)}
                            renderInput={(props) => (
                                <TextField className="Year" {...props} name="yearPicker" sx={{ marginLeft: '20px' }} />
                            )}
                        />
                    </LocalizationProvider>
                </BoxFormControlStyle>
            </Box>
            <Grid container sx={{ marginBottom: '20px' }} spacing={4}>
                <Grid item md={6}>
                    <TotalCard data={data} />
                </Grid>
                <Grid item md={6}>
                    <AmountCard data={data} />
                </Grid>
            </Grid>
            <Box sx={{ marginBottom: '50px' }}>
                <LineChart data={data} />
            </Box>
            <Box sx={{ marginBottom: '50px' }}>
                <BarChart data={data} />
            </Box>
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
export default withAuth(User);
