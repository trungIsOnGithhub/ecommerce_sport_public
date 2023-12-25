import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, ImageList, ImageListItem } from '@mui/material';
import { ManOutlined } from '@mui/icons-material';

const Img = styled('img')({
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    '&:hover': {
        opacity: '.5',
    },
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '100%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Slider = ({ avatar, data }: { avatar: string; data: string[] }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps: number = data.length + 1;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1));
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ width: '100%', p: 2 }}>
                <Img alt="Stadium" src={activeStep == 0 ? avatar : data[activeStep - 1]} />
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext}>
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </Button>
                }
            />
        </Box>
    );
};

export default function ImageSlider({ avatar, data }: { avatar: string; data: string[] }) {
    const [open, setOpen] = React.useState(false);
    const [mainImg, setMainImg] = React.useState<string>(avatar);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Grid container>
            <Grid item>
                <Img alt="Stadium" src={mainImg || avatar} onClick={handleOpen} loading="lazy" />
            </Grid>
            <Grid item>
                <ImageList cols={3} rowHeight={164}>
                    {Array.from(Array(3)).map((_, index) => {
                        if (index === 0) {
                            return (
                                <ImageListItem key={avatar}>
                                    <Img
                                        src={avatar}
                                        srcSet={avatar}
                                        // alt={item.title}
                                        loading="lazy"
                                        onClick={(e) => {
                                            setMainImg((e.target as any).currentSrc);
                                        }}
                                    />
                                </ImageListItem>
                            );
                        } else
                            return data[index - 1] ? (
                                <ImageListItem key={data[index - 1]}>
                                    <Img
                                        src={`${data[index - 1]}`}
                                        srcSet={`${data[index - 1]}`}
                                        // alt={item.title}
                                        loading="lazy"
                                        onClick={(e) => {
                                            setMainImg((e.target as any).currentSrc);
                                        }}
                                    />
                                </ImageListItem>
                            ) : null;
                    })}
                </ImageList>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="image-title"
                    aria-describedby="image-description"
                >
                    <Box sx={style}>
                        <Slider data={data} avatar={avatar} />
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
}
