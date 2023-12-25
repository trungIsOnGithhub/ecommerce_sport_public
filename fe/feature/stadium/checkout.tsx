import { useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';

import { AuthContext } from '../../store';
import { ICartItem } from './stepper';
import { VerifyPayment } from './verifyPayment';
import { DataPaymentType } from './interfaces';
import { PaymentMethod } from './paymentMethod';

interface IPayment {
    data: DataPaymentType;
    updateData: Function;
    CartItem: ICartItem;
    deleteItem: Function;
    handleNext: Function;
}

const Checkout = ({ data, updateData, handleNext }: IPayment) => {
    const { state } = useContext(AuthContext);

    const [verifyPayment, setVerifyPayment] = useState<boolean>(false);

    return (
        <Container sx={{ mt: '40px' }}>
            <Grid container spacing={10}>
                <Grid item md={6}>
                    <VerifyPayment state={state} setVerifyPayment={setVerifyPayment} />
                </Grid>
                <Grid item md={6}>
                    <PaymentMethod
                        data={data}
                        updateData={updateData}
                        verifyPayment={verifyPayment}
                        handleNext={handleNext}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;
