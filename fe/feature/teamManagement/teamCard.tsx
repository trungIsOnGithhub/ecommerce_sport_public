import React from 'react';
import {
    Button,
    Box,
    FormControl,
    InputLabel,
    Paper,
    OutlinedInput,
    Grid,
    Typography,
    Popover,
    InputAdornment,
    IconButton,
    TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { useAxios } from '../../hooks';
import DefaultTeamAvatar from '../../public/li.jpg';
import { BoxStyles, PaperStyles, Img } from './styles';
import { ITeam } from './interfaces';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import AlertCustom from '../../components/alert';
import { ButtonStyle } from '../../components/button';
import invitationService from '../../services/invitationService';
import userService from '../../services/userService';

const InvitePopover = ({ data }: { data: ITeam }) => {
    const [phone, setPhone] = React.useState<string>('');
    const [phoneVerify, setPhoneVerify] = React.useState<boolean>(false);
    const [phoneError, setPhoneError] = React.useState<boolean>(false);
    const [invitedUser, setInvitedUser] = React.useState({ name: '', _id: '' });
    const [description, setDescription] = React.useState<string>('');
    const [alert, setAlert] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const { resData, error, loading, setParams } = useAxios(invitationService.createInvitationByLeader);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
        setPhoneVerify(false);
        setPhoneError(false);
    };

    const handlePhoneVerify = () => {
        const getUserByPhone = async () => {
            const res = await userService.getUserByPhone(phone);
            if (res.data.data.user) {
                setInvitedUser(res.data.data.user);
                setPhoneVerify(true);
                setPhoneError(false);
            } else {
                setPhoneVerify(false);
                setPhoneError(true);
            }
        };
        getUserByPhone();
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (phone && phoneVerify) {
            const formData = new FormData();
            formData.append('team', data._id as string);
            formData.append('message', description);
            formData.append('user', invitedUser._id);
            setParams([
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            ]);
            setMessage('Đã gửi lời mời!');
            setAlert('');
        } else {
            setMessage('');
            setAlert('Xác minh Số điện thoại trước khi gửi lời mời!');
        }
    };

    React.useEffect(() => {
        let timer: any;
        if (resData) {
            handleClose();
            timer = setTimeout(() => {
                setMessage('');
            }, 3000);
        }
        setPhone('');
        setInvitedUser({ name: '', _id: '' });
        setPhoneVerify(false);
        setPhoneError(false);
        return () => clearTimeout(timer);
    }, [resData]);

    React.useEffect(() => {
        let timer: any;
        if (alert) {
            timer = setTimeout(() => {
                setAlert('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [alert]);

    return (
        <div>
            {message ? <AlertCustom type="success" message={message} /> : null}
            {error ? <AlertCustom type="error" message={'Gởi lời mời thất bại!'} /> : null}
            {alert ? <AlertCustom type="error" message={alert} /> : null}
            <ButtonStyle aria-describedby={id} variant="contained" sx={{ float: 'right' }} onClick={handleClick}>
                Mời thành viên mới
            </ButtonStyle>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <BoxStyles>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="invite-by-phone">Nhập SĐT</InputLabel>
                        <OutlinedInput
                            required
                            id="invite-by-phone"
                            label="Nhập SĐT"
                            name="phone"
                            fullWidth
                            onChange={(event) => handlePhoneChange(event)}
                            endAdornment={
                                <InputAdornment position="end">
                                    {phoneVerify ? (
                                        <IconButton aria-label="check number">
                                            <CheckIcon color="success" />
                                        </IconButton>
                                    ) : (
                                        <Button color="error" onClick={handlePhoneVerify}>
                                            Xác minh
                                        </Button>
                                    )}
                                </InputAdornment>
                            }
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <TextField
                        id="description"
                        label="Tin nhắn"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        fullWidth
                        multiline
                        rows={'3'}
                    />
                    <Typography variant="body2" color="text.secondary" my={2}>
                        {phoneVerify && `Bạn muốn gửi lời mời đến ${invitedUser.name}`}
                    </Typography>
                    <Typography variant="body2" color="error" my={2}>
                        {phoneError && 'Không tồn tại người nhận'}
                    </Typography>
                    <Button variant="contained" onClick={(event) => handleSubmit(event)}>
                        Gửi
                    </Button>
                </BoxStyles>
            </Popover>
        </div>
    );
};

export const Card = ({ data }: { data: ITeam }) => {
    return (
        <PaperStyles elevation={3}>
            <Grid container spacing={2}>
                <Grid item md={3} xs={12} m={'auto'}>
                    <Img alt="complex" src={data.avatar || DefaultTeamAvatar.src} />
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
                            <Typography variant="body2" color="text.secondary">
                                {data.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <InvitePopover data={data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PaperStyles>
    );
};
