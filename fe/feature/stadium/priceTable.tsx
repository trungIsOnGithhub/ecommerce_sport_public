// Create Model
import * as React from 'react';
import { Box } from '@mui/material';
import TimePriceTable from '../../components/timepricetable';
// Tabs
import { Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import StarIcon from '@mui/icons-material/StarBorderPurple500';
import { TypographyHeading2Style } from './styles';
const IconTabs = ({ data }: any) => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList value={value} onChange={handleChange} aria-label="icon position tabs example">
                    {data.map((tab: any, index: number) => {
                        return (
                            <Tab
                                icon={<StarIcon />}
                                iconPosition="start"
                                key={index}
                                label={tab.name}
                                value={String(index)}
                            />
                        );
                    })}
                </TabList>
            </Box>
            {data.map((tabData: any, index: number) => {
                return (
                    <TabPanel key={index} value={String(index)}>
                        <TimePriceTable dataRows={tabData.time_price} defaultPrice={tabData.default_price} />
                    </TabPanel>
                );
            })}
        </TabContext>
    );
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowX: 'scroll',
};

const PriceTable = ({ data }: { data: any }) => {
    return (
        <div>
            <Box sx={style}>
                <TypographyHeading2Style id="modal-modal-title" textAlign="center" mb={2}>
                    Bảng giá thuê sân
                </TypographyHeading2Style>
                <IconTabs data={data} />
            </Box>
        </div>
    );
};

export default PriceTable;
