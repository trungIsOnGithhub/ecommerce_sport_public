import { useState, useContext } from 'react';
import { Container } from '@mui/material';

import { ICartItem } from './stepper';
import { DataPaymentType } from './interfaces';
import { TotalBill } from './bill';

interface IPayment {
    data: DataPaymentType;
    updateData: Function;
    CartItem: ICartItem;
    deleteItem: Function;
}

const Payment = ({ data, updateData, CartItem, deleteItem }: IPayment) => {
    return (
        <Container sx={{ mt: '40px' }}>
            <TotalBill data={data} CartItem={CartItem} deleteItem={deleteItem} updateData={updateData} />
        </Container>
    );
};

export default Payment;
