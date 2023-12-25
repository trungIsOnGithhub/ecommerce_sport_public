import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { Box, Button, ImageListItem, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useAxios } from '../../hooks';
import { ButtonStyle } from '../../components/button';
import AlertCustom from '../../components/alert';
import { TextFieldStyle } from '../../components/textField';
import { StyleTabs, TabPanel } from '../../components/tabs';
import { SelectField } from '../../components/select';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import promotionService from '../../services/promotionService';
import stadiumService from '../../services/stadiumService';
import { PromotionConext } from '../../pages/owner/promotion_management';

import { PaperStyle, BoxTabsStyles, BoxStyles, BoxButtonStyles } from './styles';
import { IPromotion, IStadium } from './interfaces';

const dataTabs = [
    {
        name: 'Voucher',
        id: 0,
        value: 'Voucher',
    },
    {
        name: 'Giảm giá',
        id: 1,
        value: 'Discount',
    },
    {
        name: 'Tích/Trả điểm',
        id: 2,
        value: 'Point',
    },
];

const CreatePromotion = () => {
    const { resData, error, loading, setParams } = useAxios(promotionService.createPromotion);
    const { state, dispatch } = useContext(PromotionConext);

    const [newData, setNewData] = useState<IPromotion>({
        name: '',
        start_date: '',
        end_date: '',
        percent: '',
        quantity: '',
        money: '',
        description: '',
        stadiumId: '',
    });
    const [stds, setStds] = useState<IStadium[]>([]);
    const [imageSelectedFile, setImageSelectedFile] = useState<File>();
    const [imagePre, setImagePre] = useState<string>('');
    const [valueTab, setValueTab] = useState(dataTabs[0].id);

    useEffect(() => {
        const getStds = async () => {
            const resStds = await stadiumService.getStadiumOfOwner();
            setStds(resStds.data.data.stadiums);
            setNewData((pre: IPromotion) => ({ ...pre, stadiumId: resStds.data.data.stadiums[0]._id as string }));
        };
        getStds();
    }, [setStds]);
    useEffect(() => {
        let objectUrl = '';
        if (imageSelectedFile) {
            objectUrl = URL.createObjectURL(imageSelectedFile);
            setImagePre(objectUrl);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [imageSelectedFile]);

    useEffect(() => {
        if (resData) {
            dispatch((pre: IPromotion[]) => {
                pre.push(resData.data.promotion);
                return [...pre];
            });
        }
    }, [dispatch, resData]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };
    const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImageSelectedFile(files[0]);
    };
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };
    const handleChangeStd = (e: SelectChangeEvent<unknown>) => {
        setNewData({ ...newData, stadiumId: e.target.value as string });
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('start_date', moment(newData.start_date).toISOString());
        formData.append('end_date', moment(newData.end_date).toISOString());
        formData.append('description', newData.description as string);
        formData.append('percent', newData.percent);
        formData.append('money', newData.money);
        formData.append('quantity', newData.quantity);
        formData.append('type', dataTabs.find((e: any) => e.id === valueTab)?.value as string);
        if (imageSelectedFile) formData.append('image', imageSelectedFile as File);
        formData.append('stadiumId', newData.stadiumId as string);

        setParams([
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        ]);
    };

    return (
        <>
            {resData ? <AlertCustom type="success" message="Create successfully!" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <PaperStyle elevation={10}>
                <TypographyHeading2Style>Tạo chương trình khách hàng mới</TypographyHeading2Style>
                <Box sx={{ display: 'flex' }}>
                    <BoxStyles>
                        <Typography>Hình ảnh</Typography>
                        <ImageListItem>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Box
                                sx={{
                                    p: 2,
                                    my: 2,
                                    border: '2px dashed grey',
                                    height: '250px',
                                }}
                            >
                                {imagePre && <img src={imagePre} alt={'main images'} height="200px" width="200px" />}
                            </Box>
                        </ImageListItem>

                        <Button variant="contained" component="label" color="success" startIcon={<CloudUploadIcon />}>
                            Tải lên
                            <input hidden accept="image/*" type="file" onChange={handleAvatarFileSelected} />
                        </Button>
                    </BoxStyles>
                    <Box>
                        <SelectField name="Chọn sân áp dụng" value={newData.stadiumId} handleChange={handleChangeStd}>
                            {stds.map((std: IStadium) => (
                                <MenuItem key={std._id} value={std._id}>
                                    {std.name}
                                </MenuItem>
                            ))}
                        </SelectField>
                        <TextFieldStyle
                            label="Name"
                            name="name"
                            placeholder="Nhập tên chương trình khuyến mãi"
                            value={newData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mt: '15px' }}
                        />
                        <Box sx={{ display: 'flex', mt: '15px' }}>
                            <TextFieldStyle
                                onChange={handleChange}
                                value={newData.start_date}
                                name="start_date"
                                label="Từ ngày"
                                id="date"
                                type="date"
                            />
                            <TextFieldStyle
                                onChange={handleChange}
                                value={newData.end_date}
                                name="end_date"
                                label="Đến ngày"
                                id="date"
                                type="date"
                                sx={{ marginLeft: '20px' }}
                            />
                        </Box>
                        <TextFieldStyle
                            label="Mô tả"
                            name="description"
                            placeholder="Nhập mô tả"
                            value={newData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mt: '15px' }}
                        />
                        <BoxTabsStyles sx={{ mt: '15px' }}>
                            <StyleTabs
                                dataTabs={dataTabs}
                                value={valueTab}
                                handleChange={handleChangeTab}
                                color="green"
                            />
                        </BoxTabsStyles>
                        <Box>
                            <TabPanel value={valueTab} index={dataTabs[0].id}>
                                <TextFieldStyle
                                    label="Phần trăm (%)"
                                    name="percent"
                                    placeholder="Nhập phần trăm giảm giá"
                                    value={newData.percent}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextFieldStyle
                                    label="Số tiền (VND)"
                                    name="money"
                                    placeholder="Nhập số tiền giảm giá"
                                    value={newData.money}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mt: '15px' }}
                                />
                                <TextFieldStyle
                                    label="Số lượng"
                                    name="quantity"
                                    placeholder="Nhập số lượng"
                                    value={newData.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mt: '15px' }}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={dataTabs[1].id}>
                                <TextFieldStyle
                                    label="Phần trăm (%)"
                                    name="percent"
                                    placeholder="Nhập phần trăm giảm giá"
                                    value={newData.percent}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextFieldStyle
                                    label="Số tiền"
                                    name="money"
                                    placeholder="Nhập số tiền giảm giá"
                                    value={newData.money}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mt: '15px' }}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={dataTabs[2].id}>
                                Comming soon
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
                <BoxButtonStyles>
                    <ButtonStyle
                        variant="contained"
                        loading={loading}
                        sx={{ position: 'sticky' }}
                        onClick={handleSubmit}
                    >
                        Tạo mới
                    </ButtonStyle>
                </BoxButtonStyles>
            </PaperStyle>
        </>
    );
};

export default CreatePromotion;
