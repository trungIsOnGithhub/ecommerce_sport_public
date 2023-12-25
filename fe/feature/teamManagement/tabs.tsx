import * as React from 'react';
import { Box, Modal, Tab, Tabs } from '@mui/material';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import GroupsIcon from '@mui/icons-material/Groups';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CampaignIcon from '@mui/icons-material/Campaign';

import { MainTeam, MainTeamDetail } from './index';
import JoinTeam from './joinTeam';
import Invitation from './invitation';
import FootballMatch from './footballMatch';
import Banner from './banner';

import bannerBG from '../../public/li.jpg';
import teamService from '../../services/teamService';
import AlertCustom from '../../components/alert';
import { ITeam } from './interfaces';

const INIT_TAB = 0;
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TeamContext = React.createContext<{
    state: any;
    isAlert: React.Dispatch<React.SetStateAction<any>>;
    dispatch: React.Dispatch<React.SetStateAction<any>>;
}>({
    state: {},
    isAlert: () => null,
    dispatch: () => null,
});

const BasicTabs = () => {
    const [value, setValue] = React.useState<number>(INIT_TAB);
    const [mainTeams, setMainTeams] = React.useState<ITeam[]>([]);
    const [message, setMessage] = React.useState<string>('');
    const [showElement, setShowElement] = React.useState<boolean>(false);
    const [dataDetail, setDataDetail] = React.useState<ITeam>({});
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const getMainTeams = async () => {
            const teams = await teamService.getMainTeam();
            setMainTeams(teams.data.data.teams);
        };
        getMainTeams();
    }, [message]);

    React.useEffect(() => {
        let timer: any;
        if (message) {
            timer = setTimeout(() => {
                setMessage('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [message]);

    const handleCloseModal = () => {
        setShowElement(false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {message && <AlertCustom type="success" message={message} />}
            <TeamContext.Provider value={{ state: mainTeams, isAlert: setMessage, dispatch: setMainTeams }}>
                <Banner title={'Quản lý đội bóng'} imageBG={bannerBG} />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Team đã tham gia" {...a11yProps(0)} icon={<GroupsIcon />} iconPosition="start" />
                        <Tab
                            label="Quản lý team của bạn"
                            {...a11yProps(1)}
                            icon={<CoPresentIcon />}
                            iconPosition="start"
                            onClick={() => {
                                setShowElement(false);
                            }}
                        />
                        <Tab
                            label="Lời mời tham gia đội"
                            {...a11yProps(2)}
                            icon={<CampaignIcon />}
                            iconPosition="start"
                        />
                        <Tab label="Kèo" {...a11yProps(3)} icon={<ConnectWithoutContactIcon />} iconPosition="start" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <JoinTeam />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainTeam setShowElement={setShowElement} setDataDetail={setDataDetail} />

                    <Modal
                        open={showElement}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <MainTeamDetail data={dataDetail} setShowElement={setShowElement} />
                        </>
                    </Modal>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Invitation />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <FootballMatch />
                </TabPanel>
            </TeamContext.Provider>
        </Box>
    );
};

export { BasicTabs };
