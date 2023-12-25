import { Box, styled, Tab, Tabs, Typography } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface StyledTabProps {
    color?: string;
    label: string;
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    color?: string;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface DataTabsType {
    name: string;
    id: number;
}

interface StyleTabsType {
    color?: string;
    dataTabs: DataTabsType[];
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ marginTop: '20px' }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme, color }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: color ? color : theme.color.textLight,
    },
}));

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme, color }) => ({
    textTransform: 'none',
    fontSize: '15px',
    fontWeight: '550',
    color: color ? 'black' : theme.color.textLight,
    '&.Mui-selected': {
        color: color ? color : theme.color.textLight,
    },
    '&.Mui-focusVisible': {
        backgroundColor: color ? color : theme.color.textLight,
    },
}));

export const StyleTabs = ({ dataTabs, value, handleChange, color }: StyleTabsType) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={value} onChange={handleChange} color={color} aria-label="basic StyledTabs example">
                {dataTabs.map((e: DataTabsType) => (
                    <StyledTab key={e.name} label={e.name} color={color} {...a11yProps(e.id)} />
                ))}
            </StyledTabs>
        </Box>
    );
};
