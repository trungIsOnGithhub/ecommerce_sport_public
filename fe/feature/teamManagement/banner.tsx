import { useState, useCallback } from 'react';
import { Box, Modal } from '@mui/material';
import { CreateForm } from './createMatch';
import CreateTeam from './createTeam';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import AlertCustom from '../../components/alert';

import { TypographyHeading1Style, BannerContainStyles } from './styles';

const Banner = ({ title, imageBG }: { title: string; imageBG: any }) => {
    const [success, setSuccess] = useState<string>('');
    const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);
    const [openTeamModal, setOpenTeamModal] = useState<boolean>(false);

    const handleCloseMatchModal = useCallback(() => setOpenMatchModal(false), []);
    const handleMatchCreate = useCallback(() => {
        setOpenMatchModal(true);
        setSuccess('');
    }, []);

    const handleCloseTeamModal = () => {
        setOpenTeamModal(false);
    };
    const handleTeamCreate = () => {
        setOpenTeamModal(true);
        setSuccess('');
    };
    return (
        <>
            {success ? <AlertCustom type="success" message={success} /> : null}

            <BannerContainStyles sx={{ backgroundImage: `url(${imageBG.src})` }}>
                <TypographyHeading1Style>{title}</TypographyHeading1Style>
                <Box sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                    <ButtonStyle variant="contained" onClick={handleMatchCreate} sx={{ mr: 2 }}>
                        Tạo trận
                    </ButtonStyle>
                    <ButtonWhiteStyle variant="contained" onClick={handleTeamCreate}>
                        Tạo đội
                    </ButtonWhiteStyle>
                </Box>
            </BannerContainStyles>
            <Modal
                open={openMatchModal}
                onClose={handleCloseMatchModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <CreateForm handleClose={handleCloseMatchModal}/>
                </>
            </Modal>
            <Modal
                open={openTeamModal}
                onClose={handleCloseTeamModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <CreateTeam handleClose={handleCloseTeamModal} />
                </>
            </Modal>
        </>
    );
};

export default Banner;
