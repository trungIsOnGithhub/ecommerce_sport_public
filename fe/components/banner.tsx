import * as React from 'react';
import { Box, Paper, Typography, styled, Modal } from '@mui/material';
import { ButtonStyle } from './button';
import { useState, useCallback } from 'react';

const TypographyHeading1Style = styled(Typography)(({ theme }) => ({
    margin: 'auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 30,
    letterSpacing: '0.04em',
    color: theme.color.textLight,
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center',
}));
const PaperContainStyles = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: '24px',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '30px auto',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    marginTop: '20px',
    height: '300px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        height: '500px',
    },
}));

const Banner = ({ title, imageBG }: { title: any; imageBG: any }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = useCallback(() => setOpenModal(false), []);
    const handleShowOrder = useCallback(() => {
        setOpenModal(true);
        const getOrderByIds = async () => {
            // const res = await orderService.getOrderByIds(orderIds);
            // setOrderInfo(res.data.data);
        };
        getOrderByIds();
    }, []);

    return (
        <>
            <PaperContainStyles sx={{ backgroundImage: `url(${imageBG.src})` }}>
                <TypographyHeading1Style>{title}</TypographyHeading1Style>
                {/* <Box sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                    <ButtonStyle variant="contained" onClick={handleShowOrder}>
                        Tạo mới
                    </ButtonStyle>
                </Box> */}
            </PaperContainStyles>
            {/* <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <CreatePromotion />
                </>
            </Modal> */}
        </>
    );
};

export default Banner;
