import React from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useAxios } from '../../hooks';
import AlertCustom from '../../components/alert';
import { ButtonStyle } from '../../components/button';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import teamService from '../../services/teamService';
import { TeamContext } from './tabs';
import { ITeam } from './interfaces';
import { PaperContainStyles } from './styles';

const LEVELS = ['Chuyên nghiệp', 'Cao cấp', 'Trung bình', 'Nghiệp dư'];

const MainTeamUpdate = ({
    data,
    handleCloseModal,
    handleCloseMenu,
}: {
    data: ITeam;
    handleCloseModal: any;
    handleCloseMenu: any;
}) => {
    const { state, dispatch, isAlert } = React.useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(teamService.updateTeam);
    const [newData, setNewData] = React.useState<ITeam>({
        name: data.name,
        quantity: data.quantity,
        age: data.age,
        level: data.level,
        description: data.description,
        contact: data.contact,
        // members: data.members,
    });
    const [avatarPre, setAvatarPre] = React.useState<string>('');
    const [avatarSelectedFile, setAvatarSelectedFile] = React.useState<File>();
    React.useEffect(() => {
        let objectUrl = '';
        if (avatarSelectedFile) {
            objectUrl = URL.createObjectURL(avatarSelectedFile);
            setAvatarPre(objectUrl);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [avatarSelectedFile]);

    React.useEffect(() => {
        if (resData) {
            dispatch((pre: ITeam[]) => {
                const teamIndex = pre.findIndex((e: ITeam) => e._id === resData.data.team._id);
                pre[teamIndex] = resData.data.team;
                return [...pre];
            });
            handleCloseModal();
            handleCloseMenu();
            isAlert('Cập nhật đội bóng thành công!');
        }
    }, [dispatch, resData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAvatarSelectedFile(files[0]);
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newData.name as string);
        formData.append('quantity', newData.quantity as unknown as string);
        formData.append('age', newData.age as unknown as string);
        formData.append('level', newData.level as string);
        formData.append('description', newData.description as string);
        formData.append('contact', newData.contact as string);
        // formData.append('members', JSON.stringify(newData.members));
        if (avatarSelectedFile) formData.append('avatar', avatarSelectedFile as File);
        setParams([
            data._id,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        ]);
    };
    return (
        <>
            {error ? <AlertCustom type="error" message={'Cập nhật thông tin thất bại!'} /> : null}
            <PaperContainStyles elevation={3}>
                <TypographyHeading2Style>Chỉnh sửa thông tin</TypographyHeading2Style>
                <FormControl fullWidth>
                    <TextField
                        required
                        id="name"
                        label="Tên đội bóng"
                        name="name"
                        value={newData.name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="My team"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        id="contact"
                        name="contact"
                        label="Liên hệ"
                        value={newData.contact}
                        placeholder="Nhập số điện thoại"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="Your contact"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        id="quantity"
                        label="Số lượng thành viên"
                        name="quantity"
                        type="number"
                        value={newData.quantity}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        autoComplete="quantity team"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="level-select-label">Trình độ</InputLabel>
                                <Select
                                    labelId="level-select-label"
                                    id="level"
                                    value={newData.level || 'Chuyên nghiệp'}
                                    label="Trình độ"
                                    onChange={(e) => setNewData({ ...newData, level: e.target.value as any })}
                                >
                                    {LEVELS.map((value, index) => (
                                        <MenuItem value={value} key={index}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id="age"
                                label="Độ tuổi"
                                name="age"
                                type="number"
                                value={newData.age}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ inputProps: { min: 1 } }}
                                autoComplete="Your age"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        id="description"
                        label="Mô tả"
                        name="description"
                        value={newData.description}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={'3'}
                        sx={{ my: 2 }}
                    />
                    <Box my={2}>
                        <Typography>Thêm ảnh đại diện</Typography>
                        <ImageList cols={1}>
                            <ImageListItem>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={avatarPre ? avatarPre : data.avatar} alt={'Avatar Team'} />
                            </ImageListItem>
                        </ImageList>
                        <Button variant="contained" component="label" color="success" startIcon={<CloudUploadIcon />}>
                            Tải lên
                            <input hidden accept="image/*" type="file" onChange={handleAvatarFileSelected} />
                        </Button>
                    </Box>
                    <ButtonStyle variant="contained" loading={loading} onClick={handleSubmit}>
                        Cập nhật
                    </ButtonStyle>
                </FormControl>
            </PaperContainStyles>
        </>
    );
};
export { MainTeamUpdate };
