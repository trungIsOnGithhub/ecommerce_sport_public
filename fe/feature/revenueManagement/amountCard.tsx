import { useState, useEffect } from 'react';
import { styled, Card, CardContent, Typography } from '@mui/material';

const CardStyle = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(to right, #f857a6, #ff5858)',
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
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        setTotalCount(
            data.reduce((accumulator: number, object: any) => {
                if (object.status == true) return accumulator + object.count;
                else return accumulator;
            }, 0),
        );
    }, [data]);
    return (
        <CardStyle sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 25 }} color="white" gutterBottom>
                    {totalCount} lượt
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'white',
                    }}
                >
                    Tổng lượt đặt
                </Typography>
            </CardContent>
        </CardStyle>
    );
};

export default BasicCard;
