import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PartTile from '../../components/parttitle';
import CreateMatch from './createMatch';
import { Match } from './footballMatchCard';
import { AssignMatch } from './footballMatchAssignCard';
import { IMatch } from './interfaces';
import matchService from '../../services/matchService';
const FootballMatch = () => {
    const [acceptedMatches, setAcceptedMatches] = useState<IMatch[]>([]);
    const [unacceptedMatches, setUnacceptedMatches] = useState<IMatch[]>([]);
    const [unassignMatches, setUnassignMatches] = useState<IMatch[]>([]);
    const suggestions = [
        {
            _id: 1,
            address: '133/23 Đinh Bộ Lĩnh, quận 1, TP.HCM',
            stadium: 'Sân Phú Thọ',
            type: 'Sân 5',
            start_time: '15h-23/12/2023',
            duration: '90ph',
            phone: '0123 456 789',
            match: {
                name: 'Chelsea',
                avatar: 'https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.li.jpg',
                age: 'U18',
                level: 'Nghiệp dư',
            },
        },
    ];
    useEffect(() => {
        const getOwnMatch = async () => {
            const resData = await matchService.getOwnMatch();
            setAcceptedMatches(resData.data.data.filter((value: IMatch) => value.accepted === true));
            setUnacceptedMatches(resData.data.data.filter((value: IMatch) => value.accepted === false));
        };
        const getUnassignMatch = async () => {
            const resData = await matchService.getUnassignMatch();
            setUnassignMatches(resData.data.data);
        };
        getOwnMatch();
        getUnassignMatch();
    }, []);
    return (
        <>
            <CreateMatch />
            <PartTile title={'Danh sách kèo cáp'} />
            {acceptedMatches.length > 0 ? (
                acceptedMatches.map((match: IMatch) => <Match key={match._id} data={match} />)
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có kèo nào được thiết lập.
                </Typography>
            )}
            <PartTile title={'Kèo chờ chấp nhận'} />
            {unacceptedMatches.length > 0 ? (
                unacceptedMatches.map((match: IMatch) => <Match key={match._id} data={match} />)
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có kèo nào được thiết lập.
                </Typography>
            )}
            {/* <PartTile title={'Gợi ý'} />
            {unassignMatches.length > 0 ? (
                unassignMatches.map((suggestion) => <AssignMatch key={suggestion._id} data={suggestion} />)
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có kèo phù hợp cho bạn.
                </Typography>
            )} */}
        </>
    );
};
export default FootballMatch;
