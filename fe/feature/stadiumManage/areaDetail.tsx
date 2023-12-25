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
// name: { type: String, required: true },
// size: { type: String },
// quantity: { type: Number },
// description: { type: String },
// type: { type: String, required: true },
// status: { type: String },
// default_price: { type: Number },
// time_price: [
//     {
//         from: {
//             type: Number,
//             require: true,
//         },
//         to: {
//             type: Number,
//             require: true,
//         },
//         price: {
//             type: Number,
//             require: true,
//         },
//     },
// ],
// extra_infor: [
//     {
//         key: {
//             type: String,
//             require: true,
//         },
//         value: {
//             type: String,
//             require: true,
//         },
//     },
// ],
const AreaDetail = (props: any) => {
    const { data } = props;
    return (
        <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
            <TypographyHeading2Style>Thông tin sân con chi tiết</TypographyHeading2Style>
            <TextFieldStyle
                label="Tên"
                name="Name"
                placeholder="Vui lòng nhập tên"
                value={data.name}
                fullWidth
                required
                focused
            />
            <TextFieldStyle
                label="Kích thước (m)"
                name="size"
                placeholder="Vui lòng nhập kích thước"
                variant="outlined"
                value={data.size}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Số lượng"
                name="quantity"
                placeholder="Vui lòng nhập số lượng"
                variant="outlined"
                value={data.quantity}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Mô tả"
                name="description"
                placeholder="Vui lòng nhập mô tả"
                variant="outlined"
                value={data.description}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            <TextFieldStyle
                label="Giá cố định (VND)"
                name="default_price"
                placeholder="Vui lòng nhập giá cố định"
                variant="outlined"
                value={data.default_price}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
            {data.time_price.map((tp: any) => (
                <Box key={`${tp.from}${tp.from}${tp.price}`} sx={{ display: 'flex' }}>
                    <TextFieldStyle
                        label="Từ (h)"
                        name="from"
                        placeholder="Thời gian"
                        variant="outlined"
                        value={tp.from}
                        fullWidth
                        required
                        focused
                        sx={{ mt: '15px' }}
                    />
                    <TextFieldStyle
                        label="Đến (h)"
                        name="to"
                        placeholder="Thời gian"
                        variant="outlined"
                        value={tp.to}
                        fullWidth
                        required
                        focused
                        sx={{ mt: '15px' }}
                    />
                    <TextFieldStyle
                        label="Giá (VND)"
                        name="price"
                        placeholder="Giá"
                        variant="outlined"
                        value={tp.price}
                        fullWidth
                        required
                        focused
                        sx={{ mt: '15px' }}
                    />
                </Box>
            ))}
            <TextFieldStyle
                label="Thời gian tạo"
                name="createAt"
                placeholder="Thời gian tạo"
                variant="outlined"
                value={data.createAt}
                fullWidth
                required
                focused
                sx={{ mt: '15px' }}
            />
        </PaperStyle>
    );
};

export default AreaDetail;
