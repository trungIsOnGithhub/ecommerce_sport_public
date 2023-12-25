import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { Autocomplete, FormControl, Grid, Modal, TextField } from '@mui/material';

import DateTimeInput from '../../components/dateTimeField';
import { ButtonStyle } from '../../components/button';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import { PaperContainStyles } from './styles';

import matchService from '../../services/matchService';
import { useAxios } from '../../hooks';
import { TeamContext } from './tabs';
import { ITeam, IMatch } from './interfaces';
import AlertCustom from '../../components/alert';

export function CreateForm({ handleClose }: { handleClose: any }) {
    const { state, isAlert } = useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(matchService.createMatch);
    const [data, setData] = React.useState({
        team: state[0],
        stadium: '',
        address: '',
        startDate: moment().format('YYYY-MM-DD HH:00'),
        endDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:00'),
        contact: '',
        type: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleDateChange = (value: any, name: any) => {
        setData({ ...data, [name]: value.format('YYYY-MM-DD HH:00') });
    };

    const handleSubmit = () => {

        const formData = new FormData();
        // formData.append('name', data.name);
        formData.append('stadium', data.stadium);
        formData.append('address', data.address);
        formData.append('from', data.startDate.toString());
        formData.append('to', data.endDate.toString());
        formData.append('contact', data.contact);
        formData.append('level', data.type);
        formData.append('description', data.description);
        formData.append('myTeam', data.team._id);
        setParams([formData]);
    };

    useEffect(() => {
        if (resData) {
            handleClose();
            isAlert('Tạo trận đấu thành công!');
        }
    }, [resData]);

    return (
        <PaperContainStyles elevation={3}>
            {error ? <AlertCustom type="error" message={error} /> : null}
            <TypographyHeading2Style>Tạo trận đấu</TypographyHeading2Style>
            <FormControl fullWidth>
                <Autocomplete
                    id="team-picker"
                    value={data.team}
                    onChange={(event: any, newValue: any) => {
                        setData({ ...data, team: newValue });
                    }}
                    freeSolo
                    options={state}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Chọn đội" />}
                    sx={{ mb: 2 }}
                />

                <TextField
                    required
                    id="stadium-picker"
                    label="Chọn sân"
                    name="stadium"
                    value={data.stadium}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete="Your stadium"
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    id="address-picker"
                    label="Địa chỉ"
                    name="address"
                    value={data.address}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete="Your stadium"
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12} mb={2}>
                        <DateTimeInput
                            date={data.startDate}
                            onChange={handleDateChange}
                            name={'startDate'}
                            label={'Bắt đầu'}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} mb={2}>
                        <DateTimeInput
                            date={data.endDate}
                            onChange={handleDateChange}
                            name={'endDate'}
                            label={'Kết thúc'}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            required
                            id="contact"
                            name="contact"
                            label="Liên hệ"
                            value={data.contact}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="Your contact"
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="type"
                            label="Đội hình (người/ đội)"
                            name="type"
                            value={data.type}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="Your type"
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
                <TextField
                    id="description"
                    label="Mô tả"
                    name="description"
                    value={data.description}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete="Your description"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <ButtonStyle variant="contained" onClick={handleSubmit}>
                    Tạo trận
                </ButtonStyle>
            </FormControl>
        </PaperContainStyles>
    );
}
const CreateMatch = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ButtonStyle variant="contained" onClick={handleOpen}>
                Tạo trận
            </ButtonStyle>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-create-match"
                aria-describedby="modal-create-match-description"
            >
                <>
                    <CreateForm handleClose={handleClose} />
                </>
            </Modal>
        </>
    );
};
export default CreateMatch;
