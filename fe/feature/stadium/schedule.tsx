import moment from 'moment';
import { useEffect, useState, useContext, useCallback, Fragment, memo } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {
    AppointmentModel,
    ViewState,
    EditingState,
    IntegratedEditing,
    SchedulerDateTime,
    Resource,
    ChangeSet,
    SelectOption,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    DateNavigator,
    Toolbar,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

import { red, yellow } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';
import { StdContext } from '../../pages/stadium';
import { AreaContext } from './bookStadiumArea';
import { IItem } from './stepper';
import { VND } from '../../utils/helper';

interface SchedulerType {
    addToCart: any;
    CartItem: IItem[];
}

const RESOURCES: Resource[] = [
    {
        fieldName: 'available',
        title: 'Available',
        instances: [
            {
                id: '1',
                color: yellow[600],
                text: 'Còn trống',
            },
            {
                id: '0',
                color: red[600],
                text: 'Đã hết chỗ',
            },
        ],
    },
];

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

const CellStyle = styled(WeekView.TimeTableCell)(({ theme }) => ({
    backgroundImage:
        'repeating-linear-gradient(135deg,rgba(43, 43, 43, 0.1),rgba(0, 0, 0, 0.1) 4px,transparent 4px,transparent 9px);',

    '&.Cell-cell:hover': {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    '&.Cell-cell:focus': {
        backgroundColor: 'rgba(0,0,0,0)',
    },
}));

const DataCell = (props: any) => {
    const { startDate } = props;
    if (new Date(startDate) < new Date(Date.now())) {
        return <CellStyle {...props} onDoubleClick={undefined} />;
    }
    return <WeekView.TimeTableCell {...props} />;
};

const BasicLayoutComponent = ({ onFieldChange, appointmentData, ...restProps }: AppointmentForm.BasicLayoutProps) => {
    const { state: stateArea } = useContext(AreaContext);
    const [errMsg, setErrMsg] = useState({ status: false, message: '' });

    useEffect(() => {
        onFieldChange({ quantity: 1 });
    }, [onFieldChange]);

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
                        <span>{VND.format(calculateTotalPrice(appointmentData, stateArea))} </span>
                    </Box>
                </Box>
            </Box>
        </AppointmentForm.BasicLayout>
    );
};

const Schedule = ({ addToCart, CartItem }: SchedulerType) => {
    const { state: stateStd } = useContext(StdContext);
    const { state: stateArea } = useContext(AreaContext);

    const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(new Date());
    const [scheduleData, setScheduleData] = useState<AppointmentModel[]>([]);

    useEffect(() => {
        setScheduleData(CartItem);
    }, [CartItem]);

    const onCommitChanges = useCallback(
        ({ added }: ChangeSet) => {
            if (added) {
                added.title = `Số lượng ${added.quantity}`;
                setScheduleData((preScheduleData: AppointmentModel[]) => {
                    const startingAddedId =
                        preScheduleData.length > 0 ? Number(preScheduleData[preScheduleData.length - 1].id) + 1 : 0;
                    return [...preScheduleData, { id: startingAddedId, ...added } as AppointmentModel];
                });
                addToCart(stateArea?.name, {
                    ...added,
                    name: stateArea?.name,
                    amount: added.quantity,
                    totalPrice: calculateTotalPrice(added, stateArea),
                    new: true,
                    stadium_area_ref: stateArea?._id,
                });
            }
        },
        [addToCart, stateArea],
    );
    return (
        <Fragment>
            <Paper>
                <Scheduler data={scheduleData} height={'auto'}>
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(currentDate) => setCurrentDate(currentDate)}
                    />
                    <EditingState onCommitChanges={onCommitChanges} />

                    <IntegratedEditing />
                    <WeekView
                        startDayHour={stateStd.std?.time_open ? Number(stateStd.std.time_open) : 6}
                        endDayHour={stateStd.std?.time_close ? Number(stateStd.std.time_close) : 20}
                        cellDuration={60}
                        timeTableCellComponent={DataCell}
                    />

                    <Toolbar />
                    <DateNavigator />

                    <Appointments />
                    <AppointmentForm basicLayoutComponent={BasicLayoutComponent} />
                    <Resources data={RESOURCES} mainResourceName="available" />
                </Scheduler>
            </Paper>
        </Fragment>
    );
};

export default memo(Schedule);
