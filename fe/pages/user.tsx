import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Radar } from 'react-chartjs-2';

import bannerBG from '../public/li.jpg';
import Banner from '../components/banner';
import { TypographyHeading2Style } from '../components/typographyHeading';
import { BoxContainStyles } from '../components/boxcontain';
import { PaperStyles } from '../feature/userManagement/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { HomeLayout } from '../feature/layouts';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import userService from '../services/userService';
import { useRouter } from 'next/router';
import { TextFieldStyle } from '../components/textField';
import profileService from '../services/profileService';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const GridStyles = styled(Grid)({
    textAlign: 'center',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
});
const User: NextPageWithLayout = () => {
    const route = useRouter();
    const [user, setUser] = useState<any>({});

    const [data, setData] = useState({
        power: 0,
        physical: 0,
        speed: 0,
        skillfull: 0,
        reflex: 0,
        calm: 0,
        role: '',
        dominantFoot: '',
    });
    const [dataSportProfile, setDataSportProfile] = useState({
        labels: ['Sức mạnh', 'Thể lực', 'Tốc độ', 'Khéo léo', 'Phản xạ', 'Bình tĩnh'],
        datasets: [
            {
                label: 'Chỉ số cầu thủ',
                data: Object.values({
                    power: 0,
                    physical: 0,
                    speed: 0,
                    skillfull: 0,
                    reflex: 0,
                    calm: 0,
                }),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        setDataSportProfile({
            labels: ['Sức mạnh', 'Thể lực', 'Tốc độ', 'Khéo léo', 'Phản xạ', 'Bình tĩnh'],
            datasets: [
                {
                    label: 'Chỉ số cầu thủ',
                    data: Object.values({
                        power: data.power,
                        physical: data.physical,
                        speed: data.speed,
                        skillfull: data.skillfull,
                        reflex: data.reflex,
                        calm: data.calm,
                    }),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        });
    }, [data]);

    useEffect(() => {
        if (route.isReady) {
            const id = route.query.id ? (route.query.id as string) : '';
            const fetchUserData = async () => {
                const resUser = await userService.findUserById(id);
                setUser(resUser.data.data.user);
                const resProfile = await profileService.getProfileByUserId(id);
                if (resProfile.data.data.profile) {
                    setData(resProfile.data.data.profile);
                }
            };
            fetchUserData();
        }
    }, [route.isReady, route.query.id]);

    return (
        <BoxContainStyles>
            <Banner title={'Thông tin người dùng'} imageBG={bannerBG} />
            <PaperStyles elevation={3}>
                <Box>
                    <TypographyHeading2Style>Thông tin cá nhân người dùng</TypographyHeading2Style>
                    <Grid container spacing={2}>
                        <GridStyles item md={5}>
                            <Avatar
                                alt={user.name}
                                src={user.photo}
                                sx={{ width: '300px', height: '300px', textAlign: 'center' }}
                            />
                        </GridStyles>
                        <Grid item md={7}>
                            <>
                                <TextFieldStyle
                                    label="Tên"
                                    name="name"
                                    value={user.name}
                                    placeholder="Nhập tên"
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    focused
                                />
                                <TextFieldStyle
                                    label="SĐT"
                                    name="phone"
                                    value={user.phone}
                                    placeholder="Nhập số điện thoại"
                                    variant="outlined"
                                    sx={{ mt: '15px' }}
                                    fullWidth
                                    disabled
                                    required
                                />
                                <TextFieldStyle
                                    label="Email"
                                    name="email"
                                    value={user.email}
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
                                                value={user.dateOfBirth || moment('1/1/2000')}
                                                onChange={(newValue) => null}
                                                renderInput={(props) => (
                                                    <TextField className="Date" {...props} name="dateOfBirth" />
                                                )}
                                                inputFormat="DD/MM/YYYY"
                                                disabled
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item md={6} mt={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="gender-select-label">Giới tính</InputLabel>
                                            <Select
                                                labelId="gender-select-label"
                                                id="gender"
                                                value={user.gender || 'Male'}
                                                label="Giới tính"
                                                fullWidth
                                                disabled
                                            >
                                                <MenuItem value={'Male'}>Nam</MenuItem>
                                                <MenuItem value={'Female'}>Nữ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <TextFieldStyle
                                    label="Địa chỉ"
                                    name="address"
                                    value={user.address}
                                    placeholder="Nhập địa chỉ"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: '15px' }}
                                    disabled
                                />
                            </>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <TypographyHeading2Style>Hồ sơ thể thao</TypographyHeading2Style>
                    <Grid container spacing={2}>
                        <GridStyles item md={5}>
                            <Radar data={dataSportProfile} />
                        </GridStyles>
                        <Grid item md={7}>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <TextFieldStyle id="current-role" value={data.role} label="Vị trí trên sân" disabled />
                            </FormControl>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <TextFieldStyle
                                    id="dominantFoot"
                                    value={data.dominantFoot}
                                    label="Chân thuận"
                                    disabled
                                />
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="power"
                                            name="power"
                                            value={data.power}
                                            label="Sức mạnh"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="physical"
                                            name="physical"
                                            value={data.physical}
                                            label="Thể lực"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="speed"
                                            name="speed"
                                            value={data.speed}
                                            label="Tốc độ"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="skillfull"
                                            name="skillfull"
                                            value={data.skillfull}
                                            label="Khéo léo"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="reflex"
                                            name="reflex"
                                            value={data.reflex}
                                            label="Phản xạ"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <TextFieldStyle
                                            id="calm"
                                            name="calm"
                                            value={data.calm}
                                            label="Bình tĩnh"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </PaperStyles>
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default User;
