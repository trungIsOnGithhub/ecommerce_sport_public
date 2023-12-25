import * as React from 'react';
import { Paper } from '@mui/material';
import moment from 'moment';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';

import orderService from '../../services/orderService';
import { Content } from './tooltip';

const formatToAppointmentsType = (orders: any) => {
    const appointments = [] as any[];
    orders.forEach((order: any) => {
        const date = moment(order.date, 'DD-MM-YYYY');
        const schedules = order.schedule.map((sche: any) => {
            const startDate = date.clone().add(Number(sche.hour), 'hours').toDate();
            const endDate = date
                .clone()
                .add(Number(sche.hour) + 1, 'hours')
                .toDate();
            const orders: any[] = [];
            sche.have.map((has: any) => {
                const existing = orders.find((order) => order._id === has._id);
                if (existing) {
                    existing.count += 1;
                } else {
                    has.count = 1;
                    orders.push(has);
                }
            });
            return {
                startDate,
                endDate,
                orders,
                count: sche.count,
                title: `Số lượng ${sche.count}`,
            };
        });
        appointments.push(...schedules);
    });
    return appointments;
};

const UserSchedule = () => {
    const [statesScheduler, setstatesScheduler] = React.useState({
        data: [] as any[],
        currentDate: new Date(Date.now()),
    });

    React.useEffect(() => {
        const getScheduleDuringWeekbyDate = async () => {
            const resSchedule = await orderService.getScheduleByUser(
                moment(statesScheduler.currentDate).toISOString(true),
            );
            const orders = resSchedule.data.data as any[];
            const appointments = formatToAppointmentsType(orders);
            setstatesScheduler((pre: any) => ({ ...pre, data: appointments }));
        };
        getScheduleDuringWeekbyDate();
    }, [statesScheduler.currentDate]);

    const currentDateChange = (currentDate: any) => setstatesScheduler({ ...statesScheduler, currentDate });

    return (
        <Paper>
            <Scheduler data={statesScheduler.data}>
                <ViewState currentDate={statesScheduler.currentDate} onCurrentDateChange={currentDateChange} />
                <WeekView startDayHour={6} endDayHour={23} cellDuration={60} />

                <Appointments />

                <AppointmentTooltip contentComponent={Content} showCloseButton />
                <Toolbar />
                <DateNavigator />
            </Scheduler>
        </Paper>
    );
};
export default React.memo(UserSchedule);
