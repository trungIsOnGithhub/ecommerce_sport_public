import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PartTile from '../../components/parttitle';
import { CustomizedTables } from './memberTeam';
import { TeamInvitation } from './teamInvitation';
import { Card } from './teamCard';
import { ITeam, IUser } from './interfaces';

// Main Team Component
const MainTeamDetail = ({
    data,
    setShowElement,
}: {
    data: ITeam;
    setShowElement: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <Paper
            sx={{ width: '70%', padding: '20px', margin: 'auto', marginTop: '40px', height: '90%', overflow: 'scroll' }}
        >
            <Button size="large" startIcon={<KeyboardBackspaceIcon />} onClick={() => setShowElement(false)}>
                Quay lại
            </Button>
            <Card data={data} />
            <PartTile title={'Danh sách thành viên'} />
            <CustomizedTables id={data._id as string} rows={data.members as IUser[]} />
            <TeamInvitation id={data._id as string} />
        </Paper>
    );
};
export { MainTeamDetail };
