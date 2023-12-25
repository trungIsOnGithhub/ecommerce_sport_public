import { useState } from 'react';
import { TextFieldStyle } from '../../components/textField';
import { BoxContainStyle, BoxContentStyle } from './search.styles';
import { IconButtonStyle } from '../../components/button';
import SearchIcon from '@mui/icons-material/Search';
const searchTeamBar = ({ handleSubmit }: any) => {
    const [name, setName] = useState('');

    const handleOnSubmit = () => {
        handleSubmit(name);
    };
    return (
        <BoxContainStyle>
            <BoxContentStyle>
                <TextFieldStyle
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id="team-search"
                    label="Tên đội bóng"
                    type="search"
                    fullWidth
                />
                <IconButtonStyle size="large" onClick={handleOnSubmit}>
                    <SearchIcon sx={{ color: 'white' }} />
                </IconButtonStyle>
            </BoxContentStyle>
        </BoxContainStyle>
    );
};

export default searchTeamBar;
