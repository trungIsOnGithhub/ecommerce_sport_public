import { Fragment, useContext, useState } from 'react';
import { Divider, List, ListItem, ListItemButton } from '@mui/material';
import Cloud from '@mui/icons-material/Cloud';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DiscountIcon from '@mui/icons-material/Discount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';

import authService from '../../services/authService';
import { AuthContext } from '../../store';
import { ListItemIconStyle, ListItemTextStyle, Title } from './menu.styles';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const ToolMenu = [
    {
        id: 0,
        icon: <CalendarMonthIcon color="error" />,
        name: 'Quản lý đặt sân',
        path: '/settings/order_management',
    },
    {
        id: 1,
        icon: <GroupsIcon color="primary" />,
        name: 'Quản lý đội bóng',
        path: '/settings/team_management',
    },
    {
        id: 4,
        icon: <ManageAccountsIcon color="primary" />,
        name: 'Quản lý thông tin',
        path: '/settings/info_management',
    },
];

const ToolMenuOwner = [
    {
        id: 7,
        icon: <GroupsIcon color="primary" />,
        name: 'Quản lý sân bóng',
        path: '/owner/stadium_management',
    },
    {
        id: 8,
        icon: <CalendarMonthIcon color="error" />,
        name: 'Quản lý lịch đặt sân',
        path: '/owner/booking_management',
    },
    {
        id: 9,
        icon: <ShoppingCartIcon color="success" />,
        name: 'Quản lý đơn đặt sân',
        path: '/owner/order_management',
    },
    {
        id: 10,
        icon: <CurrencyExchangeIcon color="warning" />,
        name: 'Quản lý doanh thu',
        path: '/owner/revenue_management',
    },
    {
        id: 11,
        icon: <DiscountIcon color="secondary" />,
        name: 'Chương trình khuyến mãi',
        path: '/owner/promotion_management',
    },
    {
        id: 12,
        icon: <ManageAccountsIcon color="primary" />,
        name: 'Quản lý thông tin',
        path: '/owner/info_management',
    },
];

const TransactionMenu: any[] = [
    {
        id: 13,
        icon: <PaidIcon color="error" />,
        name: 'Lịch sử giao dịch',
        path: '/settings/transaction_management',
    },
];

const TransactionMenuOwner: any[] = [];

const findCurruntId = (arrRoutes: any[], route: string): number => {
    const currRoute = arrRoutes.find((element: any) => element.path === route);
    return currRoute ? currRoute.id : 0;
};

const MenuUser = () => {
    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = useState(findCurruntId(ToolMenu, router.asPath));
    const { state, dispatch } = useContext(AuthContext);

    if (!state.isLoginIn) return <Title>Bạn chưa đăng nhập</Title>;

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };
    const handlelogout = () => {
        authService.logout();
        dispatch({ type: 'SET_USER', payload: { name: '', email: '', isLoginIn: false } });
        Router.push('/auth/login');
    };
    return (
        <>
            <Title>Công cụ</Title>
            <List>
                {ToolMenu.map((item) => (
                    <Fragment key={item.name}>
                        <ListItem disablePadding>
                            <Link href={item.path}>
                                <ListItemButton
                                    selected={selectedIndex === item.id}
                                    onClick={(event) => handleListItemClick(event, item.id)}
                                >
                                    <ListItemIconStyle>{item.icon}</ListItemIconStyle>
                                    <ListItemTextStyle>{item.name}</ListItemTextStyle>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
            <Title>Giao dịch</Title>
            <List>
                {TransactionMenu.map((item) => (
                    <Fragment key={item.id}>
                        <ListItem disablePadding>
                            <Link href={item.path}>
                                <ListItemButton
                                    sx={{ textAlign: 'center' }}
                                    selected={selectedIndex === item.id}
                                    onClick={(event) => handleListItemClick(event, item.id)}
                                >
                                    <ListItemIconStyle>{item.icon}</ListItemIconStyle>
                                    <ListItemTextStyle>{item.name}</ListItemTextStyle>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
            <Title>Người dùng</Title>
            <List>
                <Fragment>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handlelogout}>
                            <ListItemIconStyle>
                                <LogoutIcon fontSize="small" />
                            </ListItemIconStyle>
                            <ListItemTextStyle>Đăng xuất</ListItemTextStyle>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </Fragment>
            </List>
        </>
    );
};

const MenuOwner = () => {
    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = useState(findCurruntId(ToolMenuOwner, router.asPath));
    const { state, dispatch } = useContext(AuthContext);

    if (!state.isLoginIn) return <Title>Bạn chưa đăng nhập</Title>;

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };
    const handlelogout = () => {
        authService.logout();
        dispatch({ type: 'SET_USER', payload: { name: '', email: '', isLoginIn: false } });
        Router.push('/auth/login');
    };
    return (
        <>
            <Title>Công cụ</Title>
            <List>
                {ToolMenuOwner.map((item) => (
                    <Fragment key={item.name}>
                        <ListItem disablePadding>
                            <Link href={item.path}>
                                <ListItemButton
                                    selected={selectedIndex === item.id}
                                    onClick={(event) => handleListItemClick(event, item.id)}
                                >
                                    <ListItemIconStyle>{item.icon}</ListItemIconStyle>
                                    <ListItemTextStyle>{item.name}</ListItemTextStyle>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
            {/* <Title>Giao dịch</Title> */}
            <List>
                {TransactionMenuOwner.map((item) => (
                    <Fragment key={item.id}>
                        <ListItem disablePadding>
                            <Link href={item.path}>
                                <ListItemButton
                                    sx={{ textAlign: 'center' }}
                                    selected={selectedIndex === item.id}
                                    onClick={(event) => handleListItemClick(event, item.id)}
                                >
                                    <ListItemIconStyle>
                                        <Cloud fontSize="small" />
                                    </ListItemIconStyle>
                                    <ListItemTextStyle>{item.name}</ListItemTextStyle>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
            <Title>Người dùng</Title>
            <List>
                <Fragment>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handlelogout}>
                            <ListItemIconStyle>
                                <LogoutIcon fontSize="small" />
                            </ListItemIconStyle>
                            <ListItemTextStyle>Đăng xuất</ListItemTextStyle>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </Fragment>
            </List>
        </>
    );
};

export { MenuUser, MenuOwner };
