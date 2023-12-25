import {
    Box,
    Button,
    ImageList,
    ImageListItem,
    MenuItem,
    Paper,
    SelectChangeEvent,
    styled,
    Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

import { useContext, useEffect, useState } from 'react';
import { ButtonStyle } from '../../components/button';
import { SelectField } from '../../components/select';
import { TextFieldStyle } from '../../components/textField';
import AlertCustom from '../../components/alert';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import stadiumService from '../../services/stadiumService';
import { useAxios } from '../../hooks';
import { RowsContext } from '../../pages/owner/stadium_management';

import { Province, District, Ward } from './interfaces';

const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '20px auto',
    height: '500px',
    overflowY: 'scroll',
});

export const BoxFormControlStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0.9',
    gap: 10,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
    },
}));

const StadiumCreate = (props: any) => {
    const { resData, error, loading, setParams } = useAxios(stadiumService.createStadium);
    const { state, dispatch } = useContext(RowsContext);

    const [newData, setNewData] = useState({
        name: '',
        contact: '',
        time_open: '',
        time_close: '',
        description: '',
        rules: '',
        address_detail: '',
    });
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [provinceId, setProvinceId] = useState<number>(0);
    const [districtId, setdistrictId] = useState<number>(0);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wardId, setWardId] = useState<number>(0);
    const [wards, setWards] = useState<Ward[]>([]);
    const [avatarSelectedFile, setAvatarSelectedFile] = useState<File>();
    const [imagesSelectedFile, setImagesSelectedFile] = useState<File[]>([]);
    const [avatarPre, setAvatarPre] = useState<string>('');
    const [imagesPre, setImagesPre] = useState<string[]>([]);

    useEffect(() => {
        const getProvinces = async () => {
            const provincesRes = await axios.get('https://provinces.open-api.vn/api/p/');
            setProvinces(provincesRes.data as Province[]);
        };
        getProvinces();
    }, []);

    useEffect(() => {
        let objectUrl = '';
        let objectUrls: string[] = [];
        if (avatarSelectedFile) {
            objectUrl = URL.createObjectURL(avatarSelectedFile);
            setAvatarPre(objectUrl);
        }
        if (imagesSelectedFile.length !== 0) {
            objectUrls = imagesSelectedFile.map((file: File) => URL.createObjectURL(file));
            setImagesPre(objectUrls);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            if (objectUrls.length !== 0) objectUrls.forEach((e: string) => URL.revokeObjectURL(e));
        };
    }, [avatarSelectedFile, imagesSelectedFile]);

    useEffect(() => {
        if (resData) {
            // console.log(resData.data.stadium);
            dispatch((state: any) => [...state, resData.data.stadium]);
        }
    }, [dispatch, resData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };
    const handleChangeProvince = async (e: SelectChangeEvent<unknown>) => {
        const districtsRes = await axios.get(`https://provinces.open-api.vn/api/p/${e.target.value}?depth=2`);
        setDistricts(districtsRes.data.districts as District[]);
        setdistrictId(0);
        setWardId(0);
        setProvinceId(Number(e.target.value));
    };
    const handleChangeDistrict = async (e: SelectChangeEvent<unknown>) => {
        setdistrictId(Number(e.target.value));
        const wardsRes = await axios.get(`https://provinces.open-api.vn/api/d/${e.target.value}?depth=2`);
        setWards(wardsRes.data.wards as Ward[]);
        setWardId(0);
    };
    const handleChangeWard = async (e: SelectChangeEvent<unknown>) => {
        setWardId(Number(e.target.value));
    };
    const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAvatarSelectedFile(files[0]);
    };
    const handleImagesFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImagesSelectedFile(files);
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('contact', newData.contact);
        formData.append('time_open', newData.time_open);
        formData.append('time_close', newData.time_close);
        formData.append('description', newData.description);
        formData.append('rules', newData.rules);
        formData.append('location[address]', newData.address_detail);
        formData.append('location[province][code]', String(provinceId));
        formData.append('location[district][code]', String(districtId));
        formData.append('location[ward][code]', String(wardId));
        formData.append(
            'location[province][name]',
            provinces.find((e: Province) => e.code === provinceId)?.name as string,
        );
        formData.append(
            'location[district][name]',
            districts.find((e: District) => e.code === districtId)?.name as string,
        );
        formData.append('location[ward][name]', wards.find((e: Ward) => e.code === wardId)?.name as string);
        if (avatarSelectedFile) formData.append('avatar', avatarSelectedFile as File);
        if (imagesSelectedFile.length !== 0)
            imagesSelectedFile.forEach((e: File) => {
                formData.append('images', e);
            });
        setParams([
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        ]);
    };
    return (
        <>
            {resData ? <AlertCustom type="success" message="Tạo mới thành công" /> : null}
            {error ? <AlertCustom type="error" message={error} /> : null}
            <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' }, position: 'relative' }}>
                <TypographyHeading2Style>Tạo sân bóng</TypographyHeading2Style>
                <TextFieldStyle
                    label="Tên"
                    name="name"
                    placeholder="Vui lòng nhập tên"
                    value={newData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextFieldStyle
                    label="Liên hệ (SDT)"
                    name="contact"
                    placeholder="Vui lòng nhập liên hệ (Số điện thoại)"
                    variant="outlined"
                    value={newData.contact}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mt: '15px' }}
                />
                <TextFieldStyle
                    label="Số nhà, tên đường"
                    name="address_detail"
                    placeholder="Vui lòng nhập số nhà, tên đường"
                    variant="outlined"
                    value={newData.address_detail}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mt: '15px' }}
                />
                <BoxFormControlStyle sx={{ mt: '15px' }}>
                    <SelectField name="Tỉnh/Thành phố" value={provinceId} handleChange={handleChangeProvince}>
                        {provinces.map((province: Province) => (
                            <MenuItem key={province.codename} value={province.code}>
                                {province.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Quận/Huyện" value={districtId} handleChange={handleChangeDistrict}>
                        {districts.map((district: District) => (
                            <MenuItem key={district.codename} value={district.code}>
                                {district.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Xã/Phường/Thị trấn" value={wardId} handleChange={handleChangeWard}>
                        {wards.map((ward: Ward) => (
                            <MenuItem key={ward.codename} value={ward.code}>
                                {ward.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                </BoxFormControlStyle>
                <Box sx={{ display: 'flex' }}>
                    <TextFieldStyle
                        label="Thời gian mở cửa (h)"
                        name="time_open"
                        placeholder="Thời gian mở cửa"
                        variant="outlined"
                        value={newData.time_open}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mt: '15px' }}
                    />
                    <TextFieldStyle
                        label="Thời gian đóng cửa (h)"
                        name="time_close"
                        placeholder="Thời gian đóng cửa"
                        variant="outlined"
                        value={newData.time_close}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mt: '15px' }}
                    />
                </Box>
                <TextFieldStyle
                    label="Mô tả"
                    name="description"
                    placeholder="Vui lòng nhập mô tả"
                    variant="outlined"
                    value={newData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mt: '15px' }}
                />
                <TextFieldStyle
                    label="Luật lệ"
                    name="rules"
                    placeholder="Vui lòng nhập luật lệ"
                    variant="outlined"
                    value={newData.rules}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mt: '15px' }}
                />
                <Box sx={{ mt: '15px' }}>
                    <Typography>Ảnh chính</Typography>
                    <ImageList cols={3}>
                        {avatarPre && (
                            <ImageListItem>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={avatarPre} alt={'Ảnh chính'} />
                            </ImageListItem>
                        )}

                        <Button variant="contained" component="label" color="success" startIcon={<CloudUploadIcon />}>
                            Tải lên
                            <input hidden accept="image/*" type="file" onChange={handleAvatarFileSelected} />
                        </Button>
                    </ImageList>
                </Box>
                <Box sx={{ mt: '15px' }}>
                    <Typography>Ảnh phụ</Typography>
                    <ImageList cols={3}>
                        {(imagesPre.length !== 0 ? imagesPre : []).map((item: any) => (
                            <ImageListItem key={item}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`${item}`} alt={'Ảnh phụ'} />
                            </ImageListItem>
                        ))}
                        <Button variant="contained" component="label" color="success">
                            <CloudUploadIcon />
                            Tải lên
                            <input hidden accept="image/*" multiple type="file" onChange={handleImagesFileSelected} />
                        </Button>
                    </ImageList>
                </Box>
                <ButtonStyle
                    variant="contained"
                    loading={loading}
                    fullWidth
                    sx={{ position: 'sticky', bottom: '0' }}
                    onClick={handleSubmit}
                >
                    Tạo sân bóng
                </ButtonStyle>
            </PaperStyle>
        </>
    );
};

export default StadiumCreate;
