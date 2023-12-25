import { useState, useEffect } from 'react';
import { styled, Card, CardContent, Typography } from '@mui/material';
import { VND } from '../../utils/helper';

export const CardStyle = styled(Card)(() => ({
    background: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
}));

const BasicCard = ({ data }: { data: any }) => {
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        setTotalCost(
            data.reduce((accumulator: number, object: any) => {
                if (object.status == true) return accumulator + object.sumTotalCost;
                else return accumulator;
            }, 0),
        );
    }, [data]);

    return (
        <CardStyle sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 25 }} color="white" gutterBottom>
                    {VND.format(totalCost)}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'white',
                    }}
                >
                    Tổng doanh thu
                </Typography>
            </CardContent>
        </CardStyle>
    );
};

export default BasicCard;
