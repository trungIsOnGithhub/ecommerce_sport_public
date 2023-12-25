import { Box, Paper } from '@mui/material';
import { ButtonWhiteStyle } from '../../components/button';
import { useState } from 'react';

const LowToHighFunds = `{"funds.min":1}`;
const HighToLowFunds = `{"funds.max":-1}`;
const HighToLowOrderQuantity = `{"quantityOrder":-1}`;

const SortCardBar = ({ handleSubmit }: any) => {
    const [active, setActive] = useState<string>('');

    const handleSubmitOptions = (strQuery: string) => {
        setActive(strQuery);
        handleSubmit(undefined, { sort: strQuery });
    };
    return (
        <Paper sx={{ marginBottom: '20px' }}>
            <Box sx={{ padding: '10px' }}>
                <span>Sắp xếp theo</span>
                <ButtonWhiteStyle
                    variant="outlined"
                    size="small"
                    sx={{
                        marginLeft: '5px',
                        backgroundColor: active === LowToHighFunds ? (theme) => theme.color.lightMain : null,
                        color: active === LowToHighFunds ? 'black' : null,
                    }}
                    onClick={() => handleSubmitOptions(LowToHighFunds)}
                >
                    Giá thấp đến cao
                </ButtonWhiteStyle>
                <ButtonWhiteStyle
                    variant="outlined"
                    size="small"
                    sx={{
                        marginLeft: '5px',
                        backgroundColor: active === HighToLowFunds ? (theme) => theme.color.lightMain : null,
                        color: active === HighToLowFunds ? 'black' : null,
                    }}
                    onClick={() => handleSubmitOptions(HighToLowFunds)}
                >
                    Giá cao đến thấp
                </ButtonWhiteStyle>
                <ButtonWhiteStyle
                    variant="outlined"
                    size="small"
                    sx={{
                        marginLeft: '5px',
                        backgroundColor: active === HighToLowOrderQuantity ? (theme) => theme.color.lightMain : null,
                        color: active === HighToLowOrderQuantity ? 'black' : null,
                    }}
                    onClick={() => handleSubmitOptions(HighToLowOrderQuantity)}
                >
                    Số lượng đặt sân
                </ButtonWhiteStyle>
                {/* <ButtonWhiteStyle
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: '5px' }}
                    onClick={() => handleSubmit(undefined, { promotions:  })}
                >
                    Có ưu đãi
                </ButtonWhiteStyle> */}
            </Box>
        </Paper>
    );
};

export default SortCardBar;
