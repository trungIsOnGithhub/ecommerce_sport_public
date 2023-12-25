import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import AllEvent from './allEvent';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FIRST_TAB: number = 0;
const SECOND_TAB: number = 1;

const Event = () => {
    const [value, setValue] = React.useState<number>(FIRST_TAB);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Sự kiện" {...a11yProps(0)} icon={<EmojiEventsIcon />} iconPosition="start" />
                    <Tab label="Đã tham gia" {...a11yProps(1)} icon={<CelebrationIcon />} iconPosition="start" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={FIRST_TAB}>
                <AllEvent />
            </TabPanel>
            <TabPanel value={value} index={SECOND_TAB}>
                Item Two
            </TabPanel>
        </Box>
    );
};
export { Event };
