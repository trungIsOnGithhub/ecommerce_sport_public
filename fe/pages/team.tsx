import { ReactElement, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    MenuItem,
    Modal,
    Paper,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import { SearchTeamBar } from '../feature/search';
import teamService from '../services/teamService';
import teamBG from '../public/li.jpg';
import PartTitle from '../components/parttitle';
import userService from '../services/userService';
import { Img, PaperStyles } from '../feature/teamManagement/styles';
import { TypographyHeading2Style } from '../components/typographyHeading';
import { ButtonStyle } from '../components/button';
import PartTile from '../components/parttitle';
import React from 'react';
import { useAxios } from '../hooks';
import invitationService from '../services/invitationService';
import matchService from '../services/matchService';
import LogoTeam from '../public/li.jpg';
import moment from 'moment';
import { SelectField } from '../components/select';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    photo: string;
    role: string;
    points: number;
    isRealPhone: boolean;
}

export interface ITeam {
    _id?: string;
    name?: string;
    avatar?: string;
    quantity?: string;
    age?: string;
    level?: string;
    description?: string;
    contact?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    core_stadium?: string;
    members?: string[] | IUser[];
    team_leader?: string;
}

export interface IMatch {
    _id: string;
    name: string;
    stadium: string;
    address: string;
    from: Date;
    to: Date;
    contact: string;
    type: string;
    level: string;
    description: string;
    accepted: boolean;
    myTeam: ITeam | string;
    yourTeam: ITeam | string;
    teamQueue: string[];
}

const PaperContainStyles = styled(Paper)(({ theme }) => ({
    backgroundImage: `url(${teamBG.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: '20px',
    height: '300px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        height: '200px',
    },
}));

const BoxContainStyles = styled(Box)({
    width: '90%',
    boxSizing: 'border-box',
    margin: 'auto',
});

const BoxSearchStyles = styled(Box)(({ theme }) => ({
    textAlign: 'center',

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

const TypographyStyle = styled(Typography)(({ theme }) => ({
    fontSize: '30px',
    fontWeight: '700',
    marginRight: '40px',
    marginLeft: '10px',
    marginBottom: '10px',
    color: theme.color.textLight,
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.color.darkGreen,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export function CustomizedTables({ id, rows }: { id: string; rows: IUser[] }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [rowCurr, setRowCurr] = React.useState<IUser>();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>, row: IUser) => {
        setAnchorEl(event.currentTarget);
        setRowCurr(row);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleDelete = (row: IUser) => {
        setOpenModal(true);
    };
    const handleDetail = (row: IUser) => {
        // setShowElement(true);
        // setDataDetail(row);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Avatar</StyledTableCell>
                        <StyledTableCell>Tên</StyledTableCell>
                        <StyledTableCell>SĐT</StyledTableCell>
                        <StyledTableCell>Địa chỉ</StyledTableCell>
                        <StyledTableCell>Hành động</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row: IUser, index: number) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Avatar alt="Remy Sharp" src={row.photo} />
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.phone}</StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>
                                    <a href={`/user?id=${row._id}`} target="_blank" rel="noopener noreferrer">
                                        <span>Xem chi tiết</span>
                                    </a>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell>Chưa có thành viên nào trong đội.</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Match = ({ data, teams }: { data: IMatch; teams: any }) => {
    const [teamCurr, setTeamCurr] = useState('0');
    const { resData, error, loading, setParams } = useAxios(matchService.assignMatchQueue);

    const handleChange = async (e: SelectChangeEvent<unknown>) => {
        setTeamCurr(e.target.value as any);
    };
    const handleJoinMatch = () => {
        setParams([{ myTeam: teamCurr, matchId: data._id }]);
    };
    return (
        <PaperStyles elevation={3}>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Img alt="my_team" src={(data.myTeam as ITeam).avatar} />
                    <TypographyHeading2Style sx={{ fontSize: 20 }}>
                        {(data.myTeam as ITeam).name}
                    </TypographyHeading2Style>
                </Grid>
                <Grid item md={6} m={'0 auto'}>
                    <TypographyHeading2Style>VS</TypographyHeading2Style>
                    <Typography variant="body2" gutterBottom>
                        <b> Địa chỉ:</b> {data.address}
                    </Typography>
                    <Grid container>
                        <Grid item md={7} xs={12}>
                            <Typography variant="body2" gutterBottom>
                                <b> Sân:</b> {data.stadium}
                            </Typography>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Typography variant="body2" gutterBottom>
                                <b> Loại sân:</b> {data.level} người
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={7} xs={12}>
                            <Typography variant="body2" gutterBottom>
                                <b> Thời gian:</b> {moment(data.from).format('DD-MM-YYYY hh:mm')}
                            </Typography>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Typography variant="body2" gutterBottom>
                                <b> Thời lượng: </b>
                                {moment
                                    .duration(
                                        moment(data.to, 'YYYY/MM/DD HH:mm').diff(moment(data.from, 'YYYY/MM/DD HH:mm')),
                                    )
                                    .asHours()}{' '}
                                giờ
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {data.yourTeam ? (
                    <Grid item md={3}>
                        <Img alt="your_team" src={(data.yourTeam as ITeam).avatar} />
                        <TypographyHeading2Style sx={{ fontSize: 20 }}>
                            {(data.yourTeam as ITeam).name}
                        </TypographyHeading2Style>
                    </Grid>
                ) : (
                    <>
                        <Grid item md={3}>
                            <Img alt="your_team" src={LogoTeam.src} />
                            <SelectField name="Đội bóng của bạn" value={teamCurr} handleChange={handleChange}>
                                {teams.map((team: any) => (
                                    <MenuItem key={team._id} value={team._id}>
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </SelectField>
                            <ButtonStyle
                                variant="contained"
                                loading={loading}
                                onClick={handleJoinMatch}
                                sx={{ marginTop: '5px' }}
                                disabled={resData}
                            >
                                {resData ? 'Đã gửi yêu cầu tham gia kèo này' : 'Gửi yêu cầu tham gia kèo này'}
                            </ButtonStyle>
                            {error ? <Box sx={{ color: 'red' }}>* Yêu cầu đăng nhập và chọn team của bạn</Box> : null}
                        </Grid>
                    </>
                )}
            </Grid>
        </PaperStyles>
    );
};

const TeamMatch = ({ data }: any) => {
    const [acceptedMatches, setAcceptedMatches] = useState<IMatch[]>([]);
    const [unacceptedMatches, setUnacceptedMatches] = useState<IMatch[]>([]);
    const [myTeams, setMyTeams] = useState([]);

    useEffect(() => {
        const getOwnMatch = async () => {
            const resData = await matchService.getMatchsByTeamId(data);
            setAcceptedMatches(resData.data.data.filter((value: IMatch) => value.accepted === true));
            setUnacceptedMatches(resData.data.data.filter((value: IMatch) => value.accepted === false));
        };
        getOwnMatch();
    }, [data]);

    useEffect(() => {
        const getMyTeam = async () => {
            const res = await teamService.getMainTeam();
            setMyTeams(res.data.data.teams);
        };
        getMyTeam();
    }, []);
    return (
        <>
            <PartTile title={'Kèo chờ đối thủ'} />
            {unacceptedMatches.length > 0 ? (
                unacceptedMatches.map((match: IMatch) => <Match key={match._id} data={match} teams={myTeams} />)
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có kèo nào được thiết lập.
                </Typography>
            )}
            <PartTile title={'Danh sách kèo đã cáp'} />
            {acceptedMatches.length > 0 ? (
                acceptedMatches.map((match: IMatch) => <Match key={match._id} data={match} teams={myTeams} />)
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có kèo nào được thiết lập.
                </Typography>
            )}
        </>
    );
};

const TeamCard = ({ data }: { data: any }) => {
    const [showElement, setShowElement] = useState(false);
    const [showElementMatch, setShowElementMatch] = useState(false);
    const { resData, error, loading, setParams } = useAxios(invitationService.createInvitationByUser);
    const handleInvite = () => {
        setParams([{ team: data._id }]);
    };
    return (
        <>
            <PaperStyles elevation={3} sx={{ height: '230px' }}>
                <Grid container spacing={2} sx={{ height: '90%' }}>
                    <Grid item md={3} xs={12} m={'auto'}>
                        <Img alt="complex" src={data.avatar} />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <TypographyHeading2Style>{data.name}</TypographyHeading2Style>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Thành viên:</b> {data.members?.length}/{data.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Độ tuổi:</b> U{data.age}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Liên hệ:</b> {data.contact}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Trình độ:</b> {data.level}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {data.description ? (
                                    <Typography variant="body2" color="text.secondary">
                                        {data.description}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        {' '}
                                        Không có tiêu đề
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '0' }}>
                    <ButtonStyle
                        size="small"
                        sx={{ marginLeft: '5px' }}
                        variant="contained"
                        onClick={() => setShowElementMatch(true)}
                    >
                        Trận đấu
                    </ButtonStyle>
                    <ButtonStyle
                        size="small"
                        sx={{ marginLeft: '5px' }}
                        variant="contained"
                        onClick={() => setShowElement(true)}
                    >
                        Thành viên
                    </ButtonStyle>
                </Box>
            </PaperStyles>
            <Modal
                open={showElement}
                onClose={() => setShowElement(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper
                    sx={{
                        width: '70%',
                        padding: '20px',
                        margin: 'auto',
                        marginTop: '40px',
                        height: '90%',
                        overflow: 'scroll',
                    }}
                >
                    <Button size="large" startIcon={<KeyboardBackspaceIcon />} onClick={() => setShowElement(false)}>
                        Quay lại
                    </Button>
                    <Box sx={{ textAlign: 'end' }}>
                        <ButtonStyle variant="contained" onClick={handleInvite} loading={loading} disabled={resData}>
                            {resData ? 'Đã gửi yêu cầu tham gia' : 'Gửi yêu cầu tham gia'}
                        </ButtonStyle>
                        {error ? <Box sx={{ color: 'red' }}>* Yêu cầu đăng nhập</Box> : null}
                    </Box>
                    <PartTile title={'Danh sách thành viên'} />

                    <CustomizedTables id={data._id as string} rows={data.members as any} />
                </Paper>
            </Modal>
            <Modal
                open={showElementMatch}
                onClose={() => setShowElementMatch(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper
                    sx={{
                        width: '70%',
                        padding: '20px',
                        margin: 'auto',
                        marginTop: '40px',
                        height: '90%',
                        overflow: 'scroll',
                    }}
                >
                    <Button
                        size="large"
                        startIcon={<KeyboardBackspaceIcon />}
                        onClick={() => setShowElementMatch(false)}
                    >
                        Quay lại
                    </Button>
                    <TeamMatch data={data._id} />
                </Paper>
            </Modal>
        </>
    );
};

const Detail: NextPageWithLayout = () => {
    const [teamData, setTeamData] = useState([]);
    const [newTeamsData, setNewTeamsData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const someNewTeam = async () => {
            const res = await teamService.searchTeam('', 10);
            setNewTeamsData(res.data.data.teams);
        };
        someNewTeam();
    }, []);
    const handleSearchTeam = async (name: string) => {
        const res = await teamService.searchTeam(name);
        // const resUser = await userService.getUserByPhone('');
        setTeamData(res.data.data.teams);
        setFlag(true);
        // setUserData(res.data.data.user);
        // setTeamData(teams);
        // setUserData(users);
    };
    return (
        <Container>
            <PaperContainStyles elevation={10}>
                <BoxContainStyles className="searchBox">
                    <BoxSearchStyles>
                        <TypographySearchStyles>SPOTY</TypographySearchStyles>
                    </BoxSearchStyles>
                    <BoxSearchStyles>
                        <TypographyStyle>Kiến tạo cộng đồng bóng đá lành mạnh</TypographyStyle>
                    </BoxSearchStyles>
                    <SearchTeamBar handleSubmit={handleSearchTeam} />
                </BoxContainStyles>
            </PaperContainStyles>
            <Box>
                {flag ? <PartTitle title={'Kết quả tìm kiếm'} /> : null}
                {teamData.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            {teamData.map((value, key) => {
                                return (
                                    <Grid item key={key} xs={12} md={6}>
                                        <TeamCard data={value} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </>
                ) : flag ? (
                    <Box sx={{ textAlign: 'center', color: 'gray' }}>Không tìm thấy kết quả nào</Box>
                ) : null}
            </Box>
            <Box>
                {newTeamsData.length > 0 ? (
                    <>
                        <PartTitle title={'Một số team mới tạo đề xuất cho bạn'} />
                        <Grid container spacing={2}>
                            {newTeamsData.map((value, key) => {
                                return (
                                    <Grid item key={key} xs={12} md={6}>
                                        <TeamCard data={value} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </>
                ) : null}
            </Box>
        </Container>
    );
};
Detail.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default Detail;
