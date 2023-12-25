import { Box, Modal } from '@mui/material';
import { ButtonStyle } from '../../components/button';
import { useState, useCallback } from 'react';
import CreatePromotion from './createPromotion';
import { TypographyHeading1Style, BannerContainStyles } from './styles';

const Banner = ({ title, imageBG }: { title: string; imageBG: any }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleCloseModal = useCallback(() => setOpenModal(false), []);
    const handleShowOrder = useCallback(() => {
        setOpenModal(true);
    }, []);

    return (
        <>
            <BannerContainStyles sx={{ backgroundImage: `url(${imageBG.src})` }}>
                <TypographyHeading1Style>{title}</TypographyHeading1Style>
                <Box sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                    <ButtonStyle variant="contained" onClick={handleShowOrder}>
                        Tạo mới
                    </ButtonStyle>
                </Box>
            </BannerContainStyles>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <CreatePromotion />
                </>
            </Modal>
        </>
    );
};

export default Banner;
