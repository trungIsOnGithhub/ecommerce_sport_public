import moment from 'moment';
import { Close } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import { StdContext } from '../../pages/stadium';
import { ICartItem } from './stepper';
import { CalendarMonthIconStyle, Diversity3IconStyle, TypographyHeading2Style } from './styles';
import promotionService from '../../services/promotionService';
import { DataPaymentType } from './interfaces';
import { VND } from '../../utils/helper';
interface ITotalBill {
    data: DataPaymentType;
    CartItem: ICartItem;
    deleteItem: Function;
    updateData: Function;
}
interface ISingleBill {
    value: any;
    deleteItem: any;
}
interface IPro {
    _id: string;
    name: string;
    start_date: string;
    image: string;
    end_date: string;
    percent: number;
    quantity: number;
}

interface IMultiActionAreaCard {
    pro: IPro;
    handleApplyVoucher: Function;
}

export const MultiActionAreaCard = ({ pro, handleApplyVoucher }: IMultiActionAreaCard) => {
    const handleApply = () => {};
    return (
        <Card sx={{ minWidth: 250, maxHeight: 250 }}>
            <CardActionArea>
                <CardMedia component="img" height={100} image={pro.image} alt="green iguana" />
                <CardContent>
                    <strong>{pro.name}</strong>
                    {/* <div>Bắt đầu: {moment(pro.start_date).format('HH[h]mm, DD/MM/YYYY').toString()}</div> */}
                    <div>Hạn sử dụng: {moment(pro.end_date).format('HH[h]mm, DD/MM/YYYY').toString()}</div>
                    <div>Mức giảm giá: {pro.percent}%</div>
                    <div>Số lượng: {pro.quantity}</div>
                    <Box sx={{ textAlign: 'end' }}>
                        <Button size="small" color="primary" onClick={() => handleApplyVoucher(pro._id)}>
                            Áp dụng
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export const SingleBill = ({ value, deleteItem }: ISingleBill) => {
    return (
        <Box sx={{ m: '16px 0' }}>
            <Divider sx={{ m: '16px 0' }} />
            <Grid container flexDirection={'row'} spacing={1}>
                <Grid container item>
                    <Grid item xs={2}>
                        <Diversity3IconStyle />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {value.name} - số lượng: {value.amount}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton edge="end" aria-label="comments" onClick={() => deleteItem(value)}>
                            <Close />{' '}
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item xs={2}>
                        <CalendarMonthIconStyle />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>
                            Thời gian: {value.endDate?.getHours() - value.startDate?.getHours()} giờ
                        </Typography>
                        <Typography color={(theme) => theme.palette.text.secondary}>
                            Bắt đầu {moment(value.startDate).format('DD-MM-YYYY hh:mm A')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography textAlign={'right'}>{VND.format(value.totalPrice)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export const TotalBill = ({ data, CartItem, deleteItem, updateData }: ITotalBill) => {
    const { state } = useContext(StdContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [pros, setPros] = useState<IPro[]>([]);
    const [discount, setDiscount] = useState(0);
    const [voucher, setVoucher] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const getPromotionByStd = async () => {
            const resProm = await promotionService.getPromotionByStd(state.std?._id || '');
            setPros(resProm.data.data as IPro[]);
        };
        getPromotionByStd();
    }, [state.std?._id]);

    useEffect(() => {
        let result = 0;
        let stadium_areas: any = [];
        Object.values(CartItem).forEach((value: any) => {
            result += value.reduce((price: any, item: any) => price + (item.new ? item.totalPrice : 0), 0);
            value.map((item: any) => {
                if (item.new) {
                    for (var i = 0; i < Number(item.amount); i++) {
                        stadium_areas.push({
                            start_date: moment(item.startDate).toISOString(true),
                            end_date: moment(item.endDate).toISOString(true),
                            stadium_area_ref: item.stadium_area_ref,
                        });
                    }
                }
            });
        });

        setTotalPrice(result);
        const total_cost = result - discount - voucher - score;
        updateData('total_cost', total_cost);
        updateData('stadium_areas', stadium_areas);
    }, [CartItem, discount, score, updateData, voucher]);

    const handleApplyVoucher = (voucherId: string) => {
        const voucher = pros.find((pro: IPro) => pro._id === voucherId);
        if (!voucher) return;
        if (data.customer_program) {
            if (data.customer_program.find((e: any) => e.promotion === voucher._id)) return;
        }
        const decreasedMoney = totalPrice * ((voucher?.percent || 0) / 100);
        updateData(
            'customer_program',
            data.customer_program
                ? [...data.customer_program, { price: decreasedMoney, promotion: voucher._id }]
                : [{ price: decreasedMoney, promotion: voucher._id }],
        );
        setVoucher(decreasedMoney);
    };
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                flexGrow: 1,
            }}
            elevation={2}
        >
            <TypographyHeading2Style textAlign="center">{state.std?.name}</TypographyHeading2Style>
            <Typography textAlign="center">{`Địa chỉ: ${state.std?.location?.address}, ${state.std?.location?.ward.name}, ${state.std?.location?.district.name}, ${state.std?.location?.province.name} `}</Typography>
            <Container>
                <Divider sx={{ m: '16px 0' }} />
                <strong>Các chương trình khuyến mãi</strong>
                <Box sx={{ marginTop: '10px', overflowX: 'scroll', paddingBottom: '10px' }}>
                    <Stack direction="row" spacing={2}>
                        {pros.map((pro: IPro) => (
                            <MultiActionAreaCard key={pro._id} pro={pro} handleApplyVoucher={handleApplyVoucher} />
                        ))}
                    </Stack>
                </Box>
                <Divider sx={{ m: '16px 0' }} />
                <strong>Thông tin đơn hàng</strong>
                {CartItem &&
                    Object.values(CartItem).map((appointments: any, idx: number) => {
                        return (
                            <Box key={`appointments-${idx}`}>
                                {Array.isArray(appointments)
                                    ? appointments.map((value: any, idx: number) => {
                                          return value.new ? (
                                              <SingleBill
                                                  key={`appointment-${idx}`}
                                                  value={value}
                                                  deleteItem={deleteItem}
                                              />
                                          ) : null;
                                      })
                                    : null}
                            </Box>
                        );
                    })}
                <Divider sx={{ m: '16px 0' }} />
                <Grid container>
                    <Grid container item>
                        <Grid item xs={9}>
                            <Typography>Tổng tiền:</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'right'}>
                            <Typography>{VND.format(totalPrice)}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container item>
                        <Grid item xs={9}>
                            <Typography>Voucher:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography textAlign={'right'}>
                                {voucher === 0 ? '' : '-'} {VND.format(voucher)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} />
                <Grid container mt={2}>
                    <Grid item xs={9}>
                        <Typography>Tổng thanh toán:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography textAlign={'right'}>
                            {VND.format(totalPrice - discount - voucher - score)}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};
