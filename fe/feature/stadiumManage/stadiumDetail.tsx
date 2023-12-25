import { Box, ImageList, ImageListItem, Paper, styled, Typography } from '@mui/material';
import { TextFieldStyle } from '../../components/textField';

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

const StadiumDetail = ({ data }: any) => {
    return (
        <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
            <TypographyHeading2Style>Thông tin sân bóng chi tiết</TypographyHeading2Style>
            <TextFieldStyle label="Tên" name="Name" value={data.name} fullWidth required focused />
            <TextFieldStyle
                label="Liên hệ (SDT)"
                name="contact"
                variant="outlined"
                value={data.contact}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Địa chỉ"
                name="location"
                variant="outlined"
                value={`${data.location.ward.name}, ${data.location.district.name}, ${data.location.province.name}`}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Ngày tạo"
                name="createAt"
                variant="outlined"
                value={data.createAt}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <Box sx={{ display: 'flex' }}>
                <TextFieldStyle
                    label="Thời gian mở cửa (h)"
                    name="time_open"
                    variant="outlined"
                    value={data.time_open}
                    fullWidth
                    required
                    focused
                    sx={{ mt: '15px' }}
                />
                <TextFieldStyle
                    label="Thời gian đóng cửa (h)"
                    name="time_clode"
                    variant="outlined"
                    value={data.time_close}
                    fullWidth
                    required
                    focused
                    sx={{ mt: '15px' }}
                />
            </Box>
            <TextFieldStyle
                label="Mô tả"
                name="description"
                variant="outlined"
                value={data.description}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Luật lệ"
                name="rules"
                variant="outlined"
                value={data.rules}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <Box sx={{ mt: '15px' }}>
                <Typography>Ảnh chính</Typography>
                <ImageList cols={3}>
                    <ImageListItem key={data.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`${data.avatar}`} alt={'Ảnh chính'} />
                    </ImageListItem>
                </ImageList>
            </Box>
            <Box sx={{ mt: '15px' }}>
                <Typography>Ảnh phụ</Typography>
                <ImageList cols={3}>
                    {data.images.map((item: any) => (
                        <ImageListItem key={item}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`${item}`} alt={'Ảnh phụ'} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </PaperStyle>
    );
};

export default StadiumDetail;
