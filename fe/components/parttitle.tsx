import { Box, Typography } from '@mui/material';

const PartTile = ({ title }: { title: string }) => {
    return (
        <>
            <Typography
                sx={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '700', textTransform: 'uppercase' }}
                mt="20px"
            >
                {title}
            </Typography>
            <Box sx={{ width: '140px', height: '2px', backgroundColor: '#49B649', borderRadius: '3px' }} mb="20px" />
        </>
    );
};
export default PartTile;
