import moment from 'moment';
import * as React from 'react';
import { Card } from './eventCard';
const AllEvent = () => {
    const events = [
        {
            _id: 1,
            time: moment().format('DD-MM-YYYY hh:mm:00'),
            quantity: 20,
            category: '',
            name: 'Cup Tứ Hùng',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo. Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed malesuada lobortis pretium.',
            image: 'https://giaidapviet.com/wp-content/uploads/2021/05/wc.jpg',
            status: '',
            level: 'Nghiệp dư',
            age: 'U20',
            price: '1000000',
            stadium: { name: 'Sân Gò Vấp', address: '6 Nguyễn Oanh, Gò Vấp, TP.HCM' },
            teams: [
                {
                    name: 'FC Bình Sơn',
                    avatar: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-football-logo-template_23-2149373252.jpg?w=2000',
                },
                {
                    name: 'FC Quảng Ngãi',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLT-bM19-5zQvDziGQ4HaDUIHjeEKXM4FffzZttv4Sevcq5jwrLeYxADAfAh_rrbXRNs&usqp=CAU',
                },
            ],
        },
    ];
    return <>{events.length > 0 && events.map((event) => <Card key={event._id} data={event} />)}</>;
};
export default AllEvent;
