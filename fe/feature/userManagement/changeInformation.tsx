import moment from 'moment';
import { useState, useContext } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AuthContext } from '../../store';
import userService from '../../services/userService';
import AlertCustom from '../../components/alert';
import { ButtonStyle } from '../../components/button';
import { IUser } from './interfaces';

const ChangeInformation = () => {
    const { state } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState({
        isShow: true,
        component: <></>,
    });
    const [data, setData] = useState<IUser>({
        name: state.name || '',
        phone: state.phone || '',
        email: state.email || '',
        gender: state.gender || '',
        dateOfBirth: state.dateOfBirth || '',
        address: state.address || '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await userService.changeUserInfo(data);
            setLoading(false);
            setAlert({
                isShow: true,
                component: <AlertCustom type="success" message="Thay đổi thông tin thành công!" />,
            });
        } catch (error: any) {
            setLoading(false);
            setAlert({
                isShow: true,
                component: <AlertCustom type="error" message={error.message} />,
            });
        }
    };
    return (
        <>
            {alert.isShow && alert.component}
            <TextField
                label="Tên"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Nhập tên"
                variant="outlined"
                fullWidth
            />
            <TextField
                label="SĐT"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                variant="outlined"
                sx={{ mt: '15px' }}
                fullWidth
                disabled
                required
            />
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter email"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: '15px' }}
                disabled
            />
            <Grid container spacing={2}>
                <Grid item md={6} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày sinh"
                            value={data.dateOfBirth || moment('1/1/2000')}
                            onChange={(newValue) => setData({ ...data, dateOfBirth: newValue as string })}
                            renderInput={(props) => <TextField className="Date" {...props} name="dateOfBirth" />}
                            inputFormat="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={6} mt={2}>
                    <FormControl fullWidth>
                        <InputLabel id="gender-select-label">Giới tính</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender"
                            value={data.gender || 'Male'}
                            label="Giới tính"
                            onChange={(e) => setData({ ...data, gender: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value={'Male'}>Nam</MenuItem>
                            <MenuItem value={'Female'}>Nữ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TextField
                label="Địa chỉ"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
                variant="outlined"
                fullWidth
                sx={{ mt: '15px' }}
            />
            <ButtonStyle
                type="submit"
                variant="contained"
                loading={loading}
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: '15px' }}
            >
                Cập nhật
            </ButtonStyle>
        </>
    );
};

export { ChangeInformation };
