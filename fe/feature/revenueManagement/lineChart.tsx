import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Doanh thu hàng tháng',
        },
    },
};

const labels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

const LineChart = ({ data }: { data: any }) => {
    const [totalSuccess, setTotalSuccess] = useState(Array(12).fill(0));
    const [totalFailure, setTotalFailure] = useState(Array(12).fill(0));

    const [lineData, setLineData] = useState({
        labels,
        datasets: [
            {
                label: 'Lợi nhuận',
                data: totalSuccess,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Doanh số thất bại',
                data: totalFailure,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    useEffect(() => {
        setTotalSuccess(Array(12).fill(0));
        setTotalFailure(Array(12).fill(0));
        for (let value of data) {
            if (value.status) {
                totalSuccess[value.month - 1] = value.sumTotalCost;
            } else {
                totalFailure[value.month - 1] = value.sumTotalCost;
            }
        }
        setLineData({
            labels,
            datasets: [
                {
                    label: 'Lợi nhuận',
                    data: totalSuccess,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Doanh số thất bại',
                    data: totalFailure,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        });
    }, [data]);
    return (
        <>
            <Line options={options} data={lineData} />
        </>
    );
};

export default LineChart;
