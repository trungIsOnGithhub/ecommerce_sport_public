import moment from 'moment';
import { useState, useEffect, useContext, ReactNode, Fragment, createContext } from 'react';
import { Box, Stepper, Step, Button, Container } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';

import Payment from './payment';
import Checkout from './checkout';

import BookStadiumArea from './bookStadiumArea';
import stadiumService from '../../services/stadiumService';
import { StyledStepLabel, TypographySubheadingStyle } from './styles';
import { StdContext } from '../../pages/stadium';
import { IArea, DataPaymentType } from './interfaces';
import { AuthContext } from '../../store';
import { OrderReceiver } from './orderReceiver';

export interface IItem extends AppointmentModel {
    name: string;
    amount?: string;
    totalPrice?: string;
    note?: string;
    new?: boolean;
    stadium_area_ref?: string;
}

export interface ICartItem {
    [key: string]: IItem[];
}

const handleData = (data: any, quantity: number): IItem[] => {
    const result: IItem[] = [];
    data.map((value: any, index: any) => {
        value.schedule.forEach((v: any, i: any) => {
            result.push({
                id: i,
                startDate: moment(`${value.date} ${v.hour}:00`, 'DD-MM-YYYY HH:mm').toDate(),
                endDate: moment(`${value.date} ${v.hour + 1}:00`, 'DD-MM-YYYY HH:mm').toDate(),
                title: `Đã đặt ${v.count} / ${quantity}`,
                available: v.count === quantity ? '0' : '1',
                name: '',
            });
        });
    });
    return result;
};

const steps = ['Đặt sân', 'Đơn hàng', 'Thanh toán', 'Hoàn tất'];

export const OrderContext = createContext<{
    state: any;
    dispatch: React.Dispatch<React.SetStateAction<any>>;
}>({
    state: {},
    dispatch: () => null,
});

const HorizontalLinearStepper = () => {
    const { state } = useContext(StdContext);
    const { state: stateAuth } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [cartItems, setCartItems] = useState<ICartItem>({});
    const [initCartItem, setInitCartItem] = useState<boolean>(true);

    const [order, setOrder] = useState({});
    const [data, setData] = useState<DataPaymentType>({
        total_cost: '0',
        status: '0',
        payment_method: 'Cash',
        stadium_areas: [],
    });
    const updateData = (name: any, value: any) => {
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        state.areas?.map((value: IArea) => {
            const fetchScheduleData = async () => {
                const resSchedule = await stadiumService.getStadiumSchedule(value._id);
                const result = handleData(resSchedule.data.data, value.quantity);
                setCartItems((prev) => ({ ...prev, [value.name]: result }));
            };
            fetchScheduleData();
        });
    }, [state.areas, order]);

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    const addToCart = (name: string, product: IItem) => {
        const updatedArray: IItem[] = [...cartItems[name], product];
        setCartItems({ ...cartItems, [name]: updatedArray });
        setInitCartItem(false);
    };

    const deleteItem = (product: IItem) => {
        const updatedArray: IItem[] = cartItems[product.name].filter((item: IItem) => item.id !== product.id);
        setCartItems((prev) => ({ ...prev, [product.name]: updatedArray }));
    };

    return (
        <OrderContext.Provider value={{ state: order, dispatch: setOrder }}>
            <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Stepper activeStep={activeStep} sx={{ color: (theme) => theme.color.main }}>
                    {steps.map((label: string) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StyledStepLabel {...labelProps}>{label}</StyledStepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep == 0 && (
                    <Fragment>
                        <BookStadiumArea addToCart={addToCart} CartItem={cartItems} />
                    </Fragment>
                )}
                {activeStep == 1 && (
                    <Fragment>
                        <Payment data={data} updateData={updateData} CartItem={cartItems} deleteItem={deleteItem} />
                    </Fragment>
                )}
                {activeStep == 2 && (
                    <Fragment>
                        <Checkout
                            data={data}
                            updateData={updateData}
                            CartItem={cartItems}
                            deleteItem={deleteItem}
                            handleNext={handleNext}
                        />
                    </Fragment>
                )}
                {activeStep == 3 && (
                    <Fragment>
                        <OrderReceiver />
                    </Fragment>
                )}
                {activeStep === steps.length ? (
                    <Fragment>
                        <Container sx={{ mt: '40px' }}>
                            <TypographySubheadingStyle>Hoàn tất các bước đặt sân</TypographySubheadingStyle>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Đặt lại</Button>
                            </Box>
                        </Container>
                    </Fragment>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: '10px' }}>
                            <Button
                                color="inherit"
                                size="large"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                startIcon={<WestIcon />}
                            >
                                Quay lại
                            </Button>
                            <Button
                                size="large"
                                onClick={handleNext}
                                endIcon={<EastIcon />}
                                disabled={initCartItem || activeStep === 2 || !stateAuth.isLoginIn}
                            >
                                {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
                            </Button>
                        </Box>
                        {stateAuth.isLoginIn ? null : (
                            <Box sx={{ textAlign: 'end', color: 'red', fontSize: '14px' }}>
                                * Bạn cần đăng nhập để đặt sân
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </OrderContext.Provider>
    );
};
export default HorizontalLinearStepper;
