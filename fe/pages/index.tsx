import axios from 'axios';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Container } from '@mui/system';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';

import type { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import { StyleTabs, TabPanel } from '../components/tabs';
import { Searchbar } from '../feature/search';
import { Card, SortCardBar } from '../feature/cart';
import PartTitle from '../components/parttitle';
import searchBG from '../public/li.jpg';
import orderService from '../services/orderService';
import StadiumService from '../services/stadiumService';
import PaginationCustom from '../components/pagination';

interface SeachType {
    name?: string;
    funds?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
}

interface SearchOptionType {
    sort?: any;
    page?: any;
}

const NUMBER_OF_PAGES = 8;

const dataTabs = [
    {
        name: 'Sân bóng',
        id: 0,
    },
    {
        name: 'Sự kiện',
        id: 1,
    },
    {
        name: 'Team',
        id: 2,
    },
];

export const getStaticProps = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/p/');
    return {
        props: {
            provinces: res.data,
        },
    };
};

const PaperContainStyles = styled(Paper)(({ theme }) => ({
    backgroundImage: `url(${searchBG.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1276px 300px',
    marginTop: '20px',
    height: '300px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        backgroundSize: '1276px 500px',
        height: '500px',
    },
}));

const BoxContainStyles = styled(Box)({
    width: '90%',
    boxSizing: 'border-box',
    margin: 'auto',
});

const BoxSearchStyles = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));

const TypographySearchStyles = styled(Typography)(({ theme }) => ({
    fontSize: '40px',
    fontWeight: '800',
    color: theme.color.lightMain,
    marginRight: '40px',
    marginLeft: '10px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

// const TypographyStyle = styled(Typography)(({ theme }) => ({
//     fontSize: '30px',
//     fontWeight: '700',
//     marginRight: '40px',
//     marginLeft: '10px',
//     marginBottom: '10px',
//     color: theme.color.textLight,
//     [theme.breakpoints.down('md')]: {
//         display: 'none',
//     },
// }));

const BoxTabsStyles = styled(Box)({
    width: '100%',
});

const BoxTabPanelStyles = styled(Box)({});

const Home: NextPageWithLayout = ({ provinces }: any) => {
    const [value, setValue] = useState(dataTabs[0].id);
    const [stdData, setStdData] = useState([]);
    const [topStds, setTopStds] = useState([]);
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    const searchData = useRef<SeachType>();
    const searchOption = useRef<SearchOptionType>();

    useEffect(() => {
        const getStatTopOrder = async () => {
            const res = await orderService.statTopOrder();
            setTopStds(res.data.stds);
        };
        getStatTopOrder();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = async (data?: SeachType, option?: any) => {
        let dataTemp;
        if (data) {
            dataTemp = { ...data, ...option };
            searchData.current = data;
        } else {
            dataTemp = { ...searchData.current, ...searchOption.current, ...option };
            if (option) searchOption.current = { ...searchOption.current, ...option };
        }
        const res = await StadiumService.searchStadiums(dataTemp);
        setStdData(res.data.data.stadiums);
        setCount(res.data.data.count);
        setFlag(true);
    };

    return (
        <Container>
            <PaperContainStyles elevation={10}>
                <BoxContainStyles className="searchBox">
                    <BoxSearchStyles>
                        <TypographySearchStyles>SportWeb</TypographySearchStyles>
                    </BoxSearchStyles>
                    <BoxSearchStyles>
                        <h2>Kết Nối Cộng Đồng Thể Thao</h2>
                    </BoxSearchStyles>
                    <Searchbar provinces={provinces} handleSubmit={handleSubmit} />
                </BoxContainStyles>
            </PaperContainStyles>
            <Box>
                {flag ? <PartTitle title={'Kết quả tìm kiếm'} /> : null}
                {stdData.length !== 0 ? (
                    <>
                        <SortCardBar handleSubmit={handleSubmit} />
                        <Grid container spacing={2}>
                            {stdData.map((value, key) => {
                                return (
                                    <Grid item key={key} xs={12} sm={6} md={3}>
                                        <Card stdData={value} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <PaginationCustom count={Math.ceil(count / NUMBER_OF_PAGES)} handleSubmit={handleSubmit} />
                    </>
                ) : flag ? (
                    <h2 style={{textAlign: "center", color: "gray"}}>KHÔNG TÌM THẤY KẾT QUẢ</h2>
                ) : null}

                <PartTitle title={'Top sân đặt nhiều nhất'} />
                <Grid container spacing={2}>
                    {topStds.map((value, key) => {
                        return (
                            <Grid item key={key} xs={12} sm={6} md={3}>
                                <Card stdData={value} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default Home;
// export default withAuth(Home);
