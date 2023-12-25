import { useContext, useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    TextField,
    MenuItem,
    InputLabel,
    Select,
    Box,
    Button,
    ImageList,
    ImageListItem,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { TeamContext } from './tabs';
import { useAxios } from '../../hooks';
import teamService from '../../services/teamService';
import { ButtonStyle } from '../../components/button';
import AlertCustom from '../../components/alert';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import { PaperContainStyles } from './styles';
import { ITeam } from './interfaces';

const LEVELS = ['Chuyên nghiệp', 'Cao cấp', 'Trung bình', 'Nghiệp dư'];

const CreateTeam = ({ handleClose }: { handleClose: any }) => {
    const { state, dispatch, isAlert } = useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(teamService.createTeam);
    const [data, setData] = useState<ITeam>({
        name: '',
        quantity: '',
        age: '18',
        level: 'Chuyên nghiệp',
        description: '',
        contact: '',
    });
    const [avatarPre, setAvatarPre] = useState<string>('');
    const [avatarSelectedFile, setAvatarSelectedFile] = useState<File>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAvatarSelectedFile(files[0]);
    };

    useEffect(() => {
        let objectUrl = '';
        if (avatarSelectedFile) {
            objectUrl = URL.createObjectURL(avatarSelectedFile);
            setAvatarPre(objectUrl);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [avatarSelectedFile]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name as string);
        formData.append('quantity', data.quantity as string);
        formData.append('age', data.age as string);
        formData.append('level', data.level as string);
        formData.append('description', data.description as string);
        formData.append('contact', data.contact as string);
        if (avatarSelectedFile) formData.append('avatar', avatarSelectedFile as File);
        setParams([
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        ]);
    };
    useEffect(() => {
        if (resData) {
            handleClose();
            dispatch((pre: ITeam[]) => {
                pre.push(resData.data.team);
                return [...pre];
            });
            isAlert('Tạo đội bóng thành công!');
        }
    }, [resData, dispatch]);
    return (
        <>
            {error ? <AlertCustom type="error" message={error} /> : null}
            <PaperContainStyles elevation={3}>
                <TypographyHeading2Style>Đăng ký đội bóng</TypographyHeading2Style>
                <FormControl fullWidth>
                    <TextField
                        required
                        id="name"
                        label="Tên đội bóng"
                        name="name"
                        value={data.name}
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
                        value={data.contact}
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
                        value={data.quantity}
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
                                    value={data.level || 'Chuyên nghiệp'}
                                    label="Trình độ"
                                    onChange={(e) => setData({ ...data, level: e.target.value as any })}
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
                                value={data.age}
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
                        value={data.description}
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
                            {avatarPre && (
                                <ImageListItem>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={avatarPre} alt={'Avatar Team'} />
                                </ImageListItem>
                            )}
                        </ImageList>
                        <Button variant="contained" component="label" color="success" startIcon={<CloudUploadIcon />}>
                            Tải lên
                            <input hidden accept="image/*" type="file" onChange={handleAvatarFileSelected} />
                        </Button>
                    </Box>
                    <ButtonStyle variant="contained" loading={loading} onClick={handleSubmit}>
                        Tạo mới
                    </ButtonStyle>
                </FormControl>
            </PaperContainStyles>
        </>
    );
};
export default CreateTeam;
