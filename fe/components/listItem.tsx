import { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface ListItemCustomProps {
    icon: ReactNode;
    title: string;
    content: string;
}

const ListItemCustom = ({ icon, title, content }: ListItemCustomProps) => {
    return (
        <ListItem sx={{ padding: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>{icon}</ListItemIcon>
            <ListItemText>
                <strong>{title}</strong>
                <span>{content}</span>
            </ListItemText>
        </ListItem>
    );
};

export default ListItemCustom;
