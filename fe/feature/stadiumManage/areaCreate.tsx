import { Box, ImageList, ImageListItem, Paper, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AlertCustom from '../../components/alert';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { TextFieldStyle } from '../../components/textField';
import { useAxios } from '../../hooks';
import stadiumService from '../../services/stadiumService';

const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '20px auto',
    height: '500px',
    overflowY: 'scroll',
});

export const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
    margin: '20px auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: theme.color.main,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
}));
const AreaCreate = (props: any) => {
    const { data, setDataArea } = props;
    const { resData, error, loading, setParams } = useAxios(stadiumService.createArea);

    const [newData, setNewData] = useState({
        name: '',
        size: '',
        quantity: '',
        description: '',
        type: '',
        status: '',
        default_price: '',
        time_price: [
            {
                from: '',
                to: '',
                price: '',
            },
        ] as any[],
    });

    useEffect(() => {
        if (resData) {
            setDataArea((pre: any) => [...pre, resData.data.area]);
        }
    }, [resData, setDataArea]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    const handleDynamicChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let dataTemp = { ...newData };
        dataTemp['time_price'][index][event.target.name] = event.target.value;
        setNewData(dataTemp);
    };
    const handleAddField = () => {
        let newfield = { from: '', to: '', price: '' };

        setNewData({ ...newData, time_price: [...newData.time_price, newfield] });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setParams([data.stadium, newData]);
    };
    return (
        <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
            {resData ? <AlertCustom type="success" message="Tạo mới thành công" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <TypographyHeading2Style>Tạo sân con</TypographyHeading2Style>
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
                label="Kích thước (m) (VD: 5x7)"
                name="size"
                placeholder="Vui lòng nhập kích thước"
                variant="outlined"
                value={newData.size}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Số lượng"
                name="quantity"
                placeholder="Vui lòng nhập số lượng"
                variant="outlined"
                value={newData.quantity}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mt: '15px' }}
            />
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
                label="Giá cố định (VND)"
                name="default_price"
                placeholder="Vui lòng nhập giá cố định"
                variant="outlined"
                value={newData.default_price}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mt: '15px' }}
            />
            {newData.time_price.map((tp: any, idx: number) => (
                <Box key={idx} sx={{ display: 'flex' }}>
                    <TextFieldStyle
                        label="Từ (h)"
                        name="from"
                        placeholder="Thời gian"
                        variant="outlined"
                        value={tp.from}
                        onChange={(e: any) => handleDynamicChange(idx, e)}
                        fullWidth
                        required
                        sx={{ mt: '15px' }}
                    />
                    <TextFieldStyle
                        label="Đến (h)"
                        name="to"
                        placeholder="Thời gian"
                        variant="outlined"
                        value={tp.to}
                        onChange={(e: any) => handleDynamicChange(idx, e)}
                        fullWidth
                        required
                        sx={{ mt: '15px' }}
                    />
                    <TextFieldStyle
                        label="Giá (VND)"
                        name="price"
                        placeholder="Giá"
                        variant="outlined"
                        value={tp.price}
                        onChange={(e: any) => handleDynamicChange(idx, e)}
                        fullWidth
                        required
                        sx={{ mt: '15px' }}
                    />
                </Box>
            ))}
            <ButtonWhiteStyle variant="contained" size="small" sx={{ mt: '15px' }} onClick={handleAddField}>
                Thêm thời gian và giá
            </ButtonWhiteStyle>
            <ButtonStyle
                variant="contained"
                sx={{ mt: '15px' }}
                fullWidth
                onClick={(e: any) => handleSubmit(e)}
                type="submit"
                loading={loading}
            >
                Tạo sân con
            </ButtonStyle>
        </PaperStyle>
    );
};

export default AreaCreate;
