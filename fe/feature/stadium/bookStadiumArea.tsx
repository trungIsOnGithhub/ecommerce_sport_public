import { SyntheticEvent, createContext, useContext, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Scheduler from './schedule';
import { StyleTabs, TabPanel } from '../../components/tabs';
import { StdContext } from '../../pages/stadium';

import { IArea } from './interfaces';
import { ICartItem } from './stepper';
import { AuthContext } from '../../store/authContext';

export const AreaContext = createContext<{
    state: IArea | undefined;
}>({
    state: undefined,
});

const IconTabs = ({ addToCart, CartItem }: { addToCart: any; CartItem: ICartItem }) => {
    const { state } = useContext(StdContext);
    const { state: stateAuth } = useContext(AuthContext);
    const [value, setValue] = useState(0);

    const tabsDataType = useMemo(() => {
        return state.areas
            ? state.areas.map((tab: any, index: number) => ({
                  name: tab.name,
                  id: index,
                  value: index,
              }))
            : [];
    }, [state.areas]);
    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <StyleTabs dataTabs={tabsDataType} value={value} handleChange={handleChange} color="green" />
            {state.areas && state.areas.length > 0 ? (
                state.areas?.map((tabData: IArea, index: number) => {
                    return (
                        <TabPanel key={index} index={index} value={value}>
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    sx={{
                                        textAlign: 'end',
                                        color: 'red',
                                        fontSize: '14px',
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                    }}
                                >
                                    {stateAuth.isLoginIn
                                        ? '* Nhấn đúp vào ô trắng bất kỳ để đặt sân'
                                        : '* Bạn cần đăng nhập để đặt sân'}
                                </Box>
                            </Box>
                            <AreaContext.Provider value={{ state: tabData }}>
                                <Scheduler addToCart={addToCart} CartItem={CartItem[tabData.name] || []} />
                            </AreaContext.Provider>
                        </TabPanel>
                    );
                })
            ) : (
                <Typography color={'red'}>Hiện tại chưa có sân bóng nào hoạt động</Typography>
            )}
        </>
    );
};

export default IconTabs;
