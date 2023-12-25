import { useState } from 'react';
import axios from 'axios';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { TextFieldStyle } from '../../components/textField';
import { SelectField } from '../../components/select';
import { IconButtonStyle } from '../../components/button';
import { BoxContainStyle, BoxContentStyle, BoxFormControlStyle } from './search.styles';
import { VND } from '../../utils/helper';

export interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
}
export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: any[];
}

export interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    district_code: number;
}
interface FundType {
    min: number;
    max: number;
}
const Funds: FundType[] = [
    { min: 0, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 150000 },
    { min: 150000, max: 200000 },
    { min: 200000, max: 250000 },
    { min: 250000, max: 300000 },
    { min: 300000, max: 1000000 },
];

const SearchBar = ({ provinces, handleSubmit }: { provinces: Province[]; handleSubmit: any }) => {
    const [name, setName] = useState<string>('');
    const [funds, setFunds] = useState<string>('0');
    const [provinceId, setProvinceId] = useState<number>(0);
    const [districtId, setdistrictId] = useState<number>(0);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wardId, setWardId] = useState<number>(0);
    const [wards, setWards] = useState<Ward[]>([]);

    const handleChangeProvince = async (e: SelectChangeEvent<unknown>) => {
        if (e.target.value !== 0) {
            const districtsRes = await axios.get(`https://provinces.open-api.vn/api/p/${e.target.value}?depth=2`);
            setDistricts(districtsRes.data.districts as District[]);
        } else {
            setDistricts([]);
            setWards([]);
        }
        setWardId(0);
        setdistrictId(0);
        setWardId(0);
        setProvinceId(Number(e.target.value));
    };
    const handleChangeDistrict = async (e: SelectChangeEvent<unknown>) => {
        if (e.target.value !== 0) {
            const wardsRes = await axios.get(`https://provinces.open-api.vn/api/d/${e.target.value}?depth=2`);
            setWards(wardsRes.data.wards as Ward[]);
        } else {
            setWards([]);
        }
        setWardId(0);
        setdistrictId(Number(e.target.value));
    };
    const handleChangeWard = (e: SelectChangeEvent<unknown>) => {
        setWardId(Number(e.target.value));
    };
    const handleChangeFund = (e: SelectChangeEvent<unknown>) => {
        setFunds(String(e.target.value));
    };

    const onHandleSubmit = () => {
        handleSubmit({ name, funds, provinceId, districtId, wardId });
    };
    return (
        <BoxContainStyle>
            <BoxContentStyle>
                <TextFieldStyle
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id="standard-search"
                    label="Tên sân bóng"
                    type="search"
                />
                <BoxFormControlStyle>
                    <SelectField name="Mức giá (VND/h)" value={funds} handleChange={handleChangeFund}>
                        {Funds.map((fund: FundType) => (
                            <MenuItem key={fund.max} value={JSON.stringify(fund)}>
                                {`${VND.format(fund.min)} - ${VND.format(fund.max)}`}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Tỉnh/Thành phố" value={provinceId} handleChange={handleChangeProvince}>
                        {provinces.map((province: Province) => (
                            <MenuItem key={province.codename} value={province.code}>
                                {province.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Quận/Huyện" value={districtId} handleChange={handleChangeDistrict}>
                        {districts.map((district: District) => (
                            <MenuItem key={district.codename} value={district.code}>
                                {district.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Xã/Phường/Thị trấn" value={wardId} handleChange={handleChangeWard}>
                        {wards.map((ward: Ward) => (
                            <MenuItem key={ward.codename} value={ward.code}>
                                {ward.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                </BoxFormControlStyle>
                <IconButtonStyle size="large" onClick={onHandleSubmit}>
                    <SearchIcon sx={{ color: 'white' }} />
                </IconButtonStyle>
            </BoxContentStyle>
        </BoxContainStyle>
    );
};

export default SearchBar;
