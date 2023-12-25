import { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Modal, Button, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';

import { useAxios } from '../../hooks';
import userService from '../../services/userService';
import { ButtonStyle } from '../../components/button';
import AlertCustom from '../../components/alert';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4,
    margin: 'auto',
    textAlign: 'center',
};

export const ChangeAvatar = ({ data }: { data: string }) => {
    const [avatar, setAvatar] = useState<string>(data);
    const [avatarPre, setAvatarPre] = useState<string>('');
    const [avatarSelectedFile, setAvatarSelectedFile] = useState<File>();
    const { resData, error, loading, setParams } = useAxios(userService.changeUserInfo);
    const [alert, setAlert] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        let objectUrl = '';
        if (avatarSelectedFile) {
            objectUrl = URL.createObjectURL(avatarSelectedFile);
            setAvatarPre(objectUrl);
            setAvatar(objectUrl);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [avatarSelectedFile]);
    const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAvatarSelectedFile(files[0]);
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (avatarSelectedFile) formData.append('photo', avatarSelectedFile as File);
        try {
            setParams([
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            ]);
            setMessage('Thành công!');
            setAlert('');
        } catch (error) {
            setMessage('');
            setAlert('Thất bại!');
        }
    };
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        let timer: any;
        if (resData) {
            handleClose();
            timer = setTimeout(() => {
                setMessage('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [resData]);

    useEffect(() => {
        let timer: any;
        if (alert) {
            timer = setTimeout(() => {
                setAlert('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [alert]);
    return (
        <>
            {message ? <AlertCustom type="success" message="Cập nhật ảnh đại diện thành công!" /> : null}
            {alert ? <AlertCustom type="error" message="Cập nhật ảnh đại diện thất bại!" /> : null}

            <Avatar
                sx={{ height: '100px', width: '100px', margin: '20px auto', position: 'relative' }}
                src={avatar}
                onClick={handleOpen}
            >
                <AddIcon
                    sx={{
                        position: 'absolute',
                        right: '13px',
                        bottom: '10px',
                        color: 'green',
                        backgroundColor: 'rgba(121, 120, 120, 0.5)',
                        borderRadius: '50%',
                    }}
                />
            </Avatar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-change-avatar-title"
                aria-describedby="modal-change-avatar-description"
            >
                <Box sx={style}>
                    <Typography id="modal-change-avatar-title" variant="h6" component="h2" textAlign={'center'}>
                        Cập nhật ảnh đại diện
                    </Typography>
                    <Box
                        sx={{
                            p: 2,
                            m: 2,
                            border: '2px dashed grey',
                            height: '250px',
                        }}
                    >
                        {avatarPre && <img src={avatarPre} height="200px" width="200px" />}
                    </Box>
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                component="label"
                                color="success"
                                startIcon={<CloudUploadIcon />}
                            >
                                Tải lên
                                <input hidden accept="image/*" type="file" onChange={handleAvatarFileSelected} />
                            </Button>
                        </Grid>
                        <Grid item>
                            <ButtonStyle variant="contained" loading={loading} onClick={handleSubmit}>
                                Cập nhật
                            </ButtonStyle>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};
