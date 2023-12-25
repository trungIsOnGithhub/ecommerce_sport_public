import { Tooltip, Avatar } from '@mui/material';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
    BoxAuthStyle,
    BoxNavStyle,
    ButtonNavStyle,
    ButtonRegisterStyle,
    ButtonSigninStyle,
    ContainerStyle,
} from './header.styles';
import logo from '/public/li.jpg';
import { MenuUserDrawer } from '../../userSetting';
import { AuthContext } from '../../../store';
import { ButtonWhiteStyle } from '../../../components/button';
import { getFirstLetter } from '../../../utils/helper';

const Header = () => {
    const { state } = useContext(AuthContext);

    return (
        <ContainerStyle maxWidth="xl">
            <MenuUserDrawer />
            <Image height="60px" width="120px" src={logo} alt="logo spoty" />
            <BoxNavStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link href="/">
                    <ButtonNavStyle>Trang chủ</ButtonNavStyle>
                </Link>
                <Link href="/team">
                    <ButtonNavStyle>Đội bóng</ButtonNavStyle>
                </Link>
                <Link href="/about">
                    <ButtonNavStyle>Giới thiệu</ButtonNavStyle>
                </Link>
                <Link href="/mycompany">
                    <ButtonNavStyle>Về công ty</ButtonNavStyle>
                </Link>
                <Link href="/policy">
                    <ButtonNavStyle>Chính sách</ButtonNavStyle>
                </Link>
            </BoxNavStyle>
            <BoxAuthStyle>
                {state.isLoginIn ? (
                    <>
                        {state.role === 'user' ? (
                            <Link href="/settings/order_management">
                                <ButtonWhiteStyle
                                    variant="contained"
                                    sx={{ marginRight: '20px', height: '35px', display: { xs: 'none', md: 'block' } }}
                                >
                                    Dịch vụ của tôi
                                </ButtonWhiteStyle>
                            </Link>
                        ) : (
                            <Link href="/owner/stadium_management">
                                <ButtonWhiteStyle
                                    variant="contained"
                                    sx={{ marginRight: '20px', height: '35px', display: { xs: 'none', md: 'block' } }}
                                >
                                    Dịch vụ chủ sân
                                </ButtonWhiteStyle>
                            </Link>
                        )}

                        <Tooltip title={state.name}>
                            {state.photo !== 'default.jpg' ? (
                                <Avatar alt={state.name} src={state.photo} />
                            ) : (
                                <Avatar>{getFirstLetter(state.name)}</Avatar>
                            )}
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Link href="/auth/signup">
                            <ButtonRegisterStyle sx={{ display: { xs: 'none', md: 'block' } }}>
                                Đăng kí
                            </ButtonRegisterStyle>
                        </Link>
                        <Link href="/auth/login">
                            <ButtonSigninStyle variant="contained">Đăng nhập</ButtonSigninStyle>
                        </Link>
                    </>
                )}
            </BoxAuthStyle>
        </ContainerStyle>
    );
};

export default Header;
