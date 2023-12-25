import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export const Content = ({ children, appointmentData, ...restProps }: any) => {
    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Đội hình</TableCell>
                            <TableCell>Đã đặt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointmentData.orders.map((order: any) => {
                            return (
                                <TableRow key={order._id}>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.nameArea} người</TableCell>
                                    <TableCell>{order.count} sân</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </AppointmentTooltip.Content>
    );
};
