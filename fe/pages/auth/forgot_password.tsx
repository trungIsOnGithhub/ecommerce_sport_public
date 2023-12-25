import styled from '@emotion/styled';
import Router from 'next/router';
import { ReactElement, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import authService from '../../services/authService';
import AlertCustom from '../../components/alert';
import { NextPageWithLayout } from '../_app';
import { HomeLayout } from '../../feature/layouts';
import { TextFieldStyle } from '../../components/textField';
import { ButtonStyle } from '../../components/button';

const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '20px auto',
});

const ButtonFormStyle = styled(ButtonStyle)({
    margin: '30px 0 20px 0',
    height: '40px',
});

const ForgotPassword: NextPageWithLayout = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isShow: true,
        component: <></>,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await authService.forgotPassword(username);
            setLoading(false);
            setAlert({
                isShow: true,
                component: <AlertCustom type="success" message="Successfull ! Check your email." />,
            });
            setTimeout(() => {
                Router.push(`/auth/reset_password?username=${username}`);
            }, 2000);
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
            <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '400px' } }}>
                <Grid alignItems={'center'}>
                    <h2>Quên mật khẩu</h2>
                </Grid>
                <TextFieldStyle
                    label="Số điện thoại/ Email"
                    name="username"
                    onChange={handleChange}
                    placeholder="Vui lòng nhập số điện thoại hoặc email"
                    variant="outlined"
                    fullWidth
                    required
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleSubmit();
                        }
                    }}
                />
                <ButtonFormStyle type="submit" variant="contained" loading={loading} onClick={handleSubmit} fullWidth>
                    Tiếp theo
                </ButtonFormStyle>
            </PaperStyle>
        </>
    );
};
ForgotPassword.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default ForgotPassword;
