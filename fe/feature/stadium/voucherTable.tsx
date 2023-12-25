import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { IStadium } from './interfaces';
import { TypographyHeading2Style } from './styles';
import promotionService from '../../services/promotionService';

interface IPro {
    _id: string;
    name: string;
    start_date: string;
    image: string;
    end_date: string;
    percent: number;
    quantity: number;
}

export const PaperStyle = styled(Paper)(({ theme }) => ({
    padding: '20px',
    margin: '20px auto',
    position: 'relative',
    width: '85%',
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
        width: '800px',
    },
}));

export const MultiActionAreaCard = ({ pro }: any) => {
    return (
        <Card sx={{ minWidth: 250, maxHeight: 250 }}>
            <CardActionArea>
                <CardMedia component="img" height={100} image={pro.image} alt="green iguana" />
                <CardContent>
                    <strong>{pro.name}</strong>
                    <div>Hạn sử dụng: {moment(pro.end_date).format('HH[h]mm, DD/MM/YYYY').toString()}</div>
                    <div>Mức giảm giá: {pro.percent}%</div>
                    <div>Số lượng: {pro.quantity}</div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
const Voucher = ({ data }: { data: IStadium }) => {
    const [pros, setPros] = useState<IPro[]>([]);
    useEffect(() => {
        const getPromotionByStd = async () => {
            const resProm = await promotionService.getPromotionByStd(data._id || '');
            setPros(resProm.data.data as IPro[]);
        };
        getPromotionByStd();
    }, [data._id]);
    return (
        <PaperStyle elevation={10}>
            <TypographyHeading2Style id="modal-modal-title" textAlign="center" mb={2}>
                Chương trình khuyến mãi
            </TypographyHeading2Style>
            <Box sx={{ marginTop: '20px' }}>
                <Grid container spacing={2}>
                    {pros.length > 0 ? (
                        pros.map((pro: IPro) => (
                            <Grid item xs={12} md={4}>
                                <MultiActionAreaCard key={pro._id} pro={pro} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body2" gutterBottom m={2} color="red">
                            Hiện tại sân chưa có chương trình khuyến mãi nào.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </PaperStyle>
    );
};
export default Voucher;
