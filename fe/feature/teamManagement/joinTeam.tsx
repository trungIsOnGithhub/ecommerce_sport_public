import { useState, useEffect, createContext } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import teamService from '../../services/teamService';

import { Card } from './joinTeamCard';
import { ITeam } from './interfaces';

export const JoinTeamContext = createContext<{ dispatch: React.Dispatch<React.SetStateAction<ITeam[]>> }>({
    dispatch: () => null,
});
const JoinTeam = () => {
    const [query, setQuery] = useState<string>('');
    const [joinTeams, setJoinTeams] = useState<ITeam[]>([]);
    useEffect(() => {
        const getTeams = async () => {
            const teams = await teamService.getJoinTeam(query);
            setJoinTeams(teams.data.data.teams);
        };
        if (query.length === 0 || query.length > 2) getTeams();
    }, [query]);
    return (
        <JoinTeamContext.Provider value={{ dispatch: setJoinTeams }}>
            {joinTeams.length > 0 && joinTeams.map((row: ITeam) => <Card key={row._id} data={row} />)}
        </JoinTeamContext.Provider>
    );
};
export default JoinTeam;
