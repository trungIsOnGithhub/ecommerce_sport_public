import { useState, useContext } from 'react';
import { Avatar, Box, Modal, TextField, Typography } from '@mui/material';

import { AuthContext } from '../../store';
import authService from '../../services/authService';
import AlertCustom from '../../components/alert';
import { ChangeAvatar } from './changeAvatar';
import { ButtonStyle } from '../../components/button';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AvatarInfo = () => {
    const { state } = useContext(AuthContext);
    const [open, setOpen] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newConfirmPassword, setNewConfirmPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const res = await authService.changePassword({
                currentPassword: currentPassword,
                newPassword: newPassword,
                newConfirmPassword: newConfirmPassword,
            });
            setError(false);
            setSuccess(true);
            handleClose();
        } catch (err) {
            setError(true);
            setSuccess(false);
        }
    };
    return (
        <>
            {error && <AlertCustom type="error" message={'Đổi mật khẩu không thành công!'} />}
            {success && <AlertCustom type="success" message={'Đổi mật khẩu thành công!'} />}
            <ChangeAvatar data={state.photo} />
            <Typography>Xin chào {state.name}</Typography>
            <Typography>{state.email}</Typography>
            <ButtonStyle type="submit" variant="contained" onClick={handleOpen} sx={{ marginTop: '10px' }}>
                Đổi mật khẩu
            </ButtonStyle>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-change-password-title"
                aria-describedby="modal-change-password-description"
            >
                <Box sx={style}>
                    <Typography id="modal-change-password-title" variant="h6" component="h2">
                        Đổi mật khẩu
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Mật khẩu hiện tại"
                            type="password"
                            value={currentPassword}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                            sx={{ my: 1 }}
                        />
                        <TextField
                            required
                            id="outlined-new-password-input"
                            label="Mật khẩu mới"
                            type="password"
                            value={newPassword}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            sx={{ my: 1 }}
                        />
                        <TextField
                            required
                            id="outlined-new-confirm-password-input"
                            label="Nhập lại mật khẩu mới"
                            type="password"
                            value={newConfirmPassword}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="new-confirm-password"
                            onChange={(e) => setNewConfirmPassword(e.target.value)}
                            fullWidth
                            sx={{ my: 1 }}
                        />
                        <ButtonStyle type="submit" variant="contained" sx={{ mr: 2 }} onClick={handleSubmit}>
                            Lưu thay đổi
                        </ButtonStyle>
                        <ButtonStyle type="submit" variant="contained" onClick={handleClose}>
                            Hủy
                        </ButtonStyle>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export { AvatarInfo };
