import * as React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, SelectOption, ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    Toolbar,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import orderService from '../../services/orderService';
import { ButtonStyle } from '../../components/button';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AreaContext } from '../../pages/owner/booking_management';
import OrderInfos from './orderInfos';
import { VND } from '../../utils/helper';

const formatToAppointmentsType = (orders: any, handleShowOrder: Function) => {
    const oppointments = [] as any[];
    orders.forEach((order: any) => {
        const date = moment(order.date, 'DD-MM-YYYY');
        const schedules = order.schedule.map((sche: any) => {
            const startDate = date.clone().add(Number(sche.hour), 'hours').toDate();
            const endDate = date
                .clone()
                .add(Number(sche.hour) + 1, 'hours')
                .toDate();
            const ids = sche.have.map((has: any) => has._id);
            return {
                startDate,
                endDate,
                ids,
                count: sche.count,
                title: `Số lượng ${sche.count}`,
                handleShowOrder,
            };
        });
        oppointments.push(...schedules);
    });
    return oppointments;
};

const AppointmentContent = (props: Appointments.AppointmentContentProps) => {
    return (
        <Appointments.AppointmentContent {...props}>
            <Box onClick={() => props.data.handleShowOrder(props.data.ids)}>
                <Box>{props.data.title}</Box>
                <Box sx={{ color: 'green' }}>Xem chi tiết</Box>
            </Box>
        </Appointments.AppointmentContent>
    );
};

const calculateTotalPrice = (data: any, dataIn: any) => {
    if (data.startDate !== undefined && data.endDate !== undefined) {
        let start = data.startDate.getHours();
        let end = data.endDate.getHours();
        let totalBill = 0;
        for (var i = start; i < end; i++) {
            var exist = false;
            dataIn.time_price.map((v: any) => {
                if (i >= v.from && i < v.to) {
                    totalBill += v.price * data.quantity;
                    exist = true;
                }
            });
            if (!exist) totalBill += dataIn.default_price * data.quantity;
        }
        return totalBill;
    } else return 0;
};

const isTheSameDate = (startDate: string, endDate: string) => {
    return moment(startDate).isSame(moment(endDate), 'date');
};

const BasicLayoutComponent = ({ onFieldChange, appointmentData, ...restProps }: AppointmentForm.BasicLayoutProps) => {
    const { state: stateArea } = useContext(AreaContext);
    const [errMsg, setErrMsg] = useState({ status: false, message: '' });

    useEffect(() => {
        onFieldChange({ quantity: 1 });
    }, [onFieldChange]);

    useEffect(() => {
        onFieldChange({ total_cost: calculateTotalPrice(appointmentData, stateArea) });
    }, [appointmentData, onFieldChange, stateArea]);

    const handleChangeStartDate = (nextValue: Date) => {
        const { endDate } = appointmentData;
        if (endDate && nextValue > endDate) {
            setErrMsg({ status: true, message: 'Thời gian bắt đầu không thể lớn hơn thời gian kết thúc' });
        } else if (endDate && !isTheSameDate(nextValue.toString(), endDate?.toString())) {
            setErrMsg({ status: true, message: 'Chỉ được đặt thời gian trong ngày' });
        } else {
            setErrMsg({ status: false, message: '' });
            onFieldChange({ startDate: nextValue });
        }
    };
    const handleChangeEndDate = (nextValue: Date) => {
        const { startDate } = appointmentData;
        if (startDate && nextValue < startDate) {
            setErrMsg({ status: true, message: 'Thời gian kết thúc không thể lớn hơn thời gian bắt đầu' });
        } else if (startDate && !isTheSameDate(nextValue.toString(), startDate?.toString())) {
            setErrMsg({ status: true, message: 'Chỉ được đặt thời gian trong ngày' });
        } else {
            if (errMsg.status) setErrMsg({ status: false, message: '' });
            onFieldChange({ endDate: nextValue });
        }
    };
    const handleChangeQuantity = (nextValue: string | number) => {
        onFieldChange({ quantity: Number(nextValue) });
    };
    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
            textEditorComponent={() => null}
            booleanEditorComponent={() => null}
            resourceEditorComponent={() => null}
            labelComponent={() => null}
            dateEditorComponent={() => null}
        >
            <Box sx={{ color: 'red', bottom: '-10px', fontSize: '13px' }}>{errMsg.status ? errMsg.message : null}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <AppointmentForm.Label text="Thời gian bắt đầu" type="titleLabel" />
                    <AppointmentForm.DateEditor
                        value={appointmentData.startDate?.toString()}
                        onValueChange={handleChangeStartDate}
                    />
                </Box>
                <Box>
                    <AppointmentForm.Label text="Thời gian kết thúc" type="titleLabel" />
                    <AppointmentForm.DateEditor
                        value={appointmentData.endDate?.toString()}
                        onValueChange={handleChangeEndDate}
                    />
                </Box>
            </Box>
            <Box>
                <AppointmentForm.Label text="Số lượng" type="titleLabel" />
                <AppointmentForm.Select
                    onValueChange={handleChangeQuantity}
                    type="outlinedSelect"
                    value={appointmentData.quantity || 1}
                    availableOptions={Array.from(Array(stateArea?.quantity)).map(
                        (value, idx) => ({ id: idx + 1, text: String(idx + 1) } as SelectOption),
                    )}
                />
            </Box>
            <Box sx={{ mt: '10px', color: 'gray' }}>
                <Typography variant="h6" fontWeight="700">
                    Thông tin đặt sân
                </Typography>
                <Box>
                    <Box>
                        <strong>Thời gian bắt đầu: </strong>
                        <span>{moment(appointmentData.startDate).format('DD/MM/YYYY hh:mm:ss A')}</span>
                        {/* <span>{appointmentData.startDate?.toLocaleString()}</span> */}
                    </Box>
                    <Box>
                        <strong>Thời gian kết thúc: </strong>
                        <span>{moment(appointmentData.endDate).format('DD/MM/YYYY hh:mm:ss A')}</span>
                        {/* <span>{appointmentData.endDate?.toLocaleString()}</span> */}
                    </Box>
                    <Box>
                        <strong>Thời lượng: </strong>
                        <span>{`${moment(appointmentData.endDate?.toString()).diff(
                            moment(appointmentData.startDate?.toString()),
                            'h',
                        )}h`}</span>
                    </Box>
                    <Box>
                        <strong>Số lượng: </strong>
                        <span>{appointmentData.quantity ? appointmentData.quantity : 1} sân</span>
                    </Box>
                    <br />
                    <Box>
                        <strong>Thành tiền: </strong>
                        <span>{VND.format(appointmentData.total_cost || 0)}</span>
                    </Box>
                </Box>
            </Box>
        </AppointmentForm.BasicLayout>
    );
};

const Demo = ({ area, handleShowOrder }: any) => {
    const [statesScheduler, setStatesScheduler] = React.useState({
        data: [] as any[],
        currentDate: new Date(Date.now()),
    });

    React.useEffect(() => {
        const getScheduleDuringWeekbyDate = async () => {
            const resSchedule = await orderService.scheduleDuringWeekbyDate(
                area,
                moment(statesScheduler.currentDate).toISOString(true),
            );
            const orders = resSchedule.data.data as any[];
            const oppointments = formatToAppointmentsType(orders, handleShowOrder);
            setStatesScheduler((pre: any) => ({ ...pre, data: oppointments }));
        };
        if (area) getScheduleDuringWeekbyDate();
        else setStatesScheduler((pre: any) => ({ ...pre, data: [] }));
    }, [area, handleShowOrder, statesScheduler.currentDate]);

    const currentDateChange = (currentDate: any) => setStatesScheduler({ ...statesScheduler, currentDate });

    const commitChanges = async ({ added }: any) => {
        const { data } = statesScheduler;
        let dataTemp = data;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            dataTemp = [...data, { id: startingAddedId, ...added }];

            const stadium_areas = Array.from(Array(added.quantity).keys()).map((e: any) => ({
                start_date: moment(added.startDate).toISOString(true),
                end_date: moment(added.endDate).toISOString(true),
                stadium_area_ref: area,
            }));
            await orderService.createOrder({
                total_cost: added.total_cost,
                status: false,
                payment_method: 'Cash',
                stadium_areas,
            } as any);
        }
        setStatesScheduler({ ...statesScheduler, data: dataTemp });
    };

    return (
        <Paper>
            <Scheduler data={statesScheduler.data}>
                <ViewState currentDate={statesScheduler.currentDate} onCurrentDateChange={currentDateChange} />
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedEditing />
                <WeekView startDayHour={6} endDayHour={23} cellDuration={60} />

                <Appointments appointmentContentComponent={AppointmentContent} />

                <Toolbar />
                <DateNavigator />
                <AppointmentForm basicLayoutComponent={BasicLayoutComponent} />
            </Scheduler>
        </Paper>
    );
};
export default React.memo(Demo);
