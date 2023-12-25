import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItemText } from '@mui/material';

import { IArea } from './interfaces';
import { ListItemButtonStyle, ListItemIconStyle, ListItemTextStyle } from './styles';

interface ShowDetailProps {
    stdAreaData: IArea[];
}

const ShowDetail = ({ stdAreaData }: ShowDetailProps) => {
    const [openDetail, setOpenDetail] = useState<number | undefined>(undefined);

    const handleClickShowDetail = (idx: number) => {
        setOpenDetail((pre: number | undefined) => (idx === pre ? undefined : idx));
    };
    return (
        <Box>
            {stdAreaData.map((value: IArea, index: number) => {
                return (
                    <Box key={index}>
                        <ListItemButtonStyle>
                            <ListItemIconStyle onClick={() => handleClickShowDetail(index)}>
                                {openDetail === index ? <ExpandLess /> : <ExpandMore />}
                            </ListItemIconStyle>
                            <ListItemText primary={value.name} />
                        </ListItemButtonStyle>
                        <Collapse in={openDetail === index} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemTextStyle secondary={`Kích thước: ${value.size}`} />
                                <ListItemTextStyle secondary={`Số lượng: ${value.quantity} sân`} />
                                <ListItemTextStyle secondary={`Mô tả: ${value.description}`} />
                            </List>
                        </Collapse>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ShowDetail;
