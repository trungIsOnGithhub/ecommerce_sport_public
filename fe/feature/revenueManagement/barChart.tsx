import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê số lượng đặt sân',
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

const BarChart = ({ data }: { data: any }) => {
    const [totalSuccess, setTotalSuccess] = useState(Array(12).fill(0));
    const [totalFailure, setTotalFailure] = useState(Array(12).fill(0));

    const [barData, setBarData] = useState({
        labels,
        datasets: [
            {
                label: 'Thành công',
                data: [100, 200],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Thất bại',
                data: [100, 150],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    useEffect(() => {
        setTotalSuccess(Array(12).fill(0));
        setTotalFailure(Array(12).fill(0));
        console.log(data);
        for (let value of data) {
            if (value.status) {
                totalSuccess[value.month - 1] = value.count;
            } else {
                totalFailure[value.month - 1] = value.count;
            }
        }
        setBarData({
            labels,
            datasets: [
                {
                    label: 'Thành công',
                    data: totalSuccess,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Thất bại',
                    data: totalFailure,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        });
    }, [data]);
    return <Bar options={options} data={barData} />;
};

export default BarChart;
