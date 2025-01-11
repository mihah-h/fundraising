'use client'

import React from 'react';
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart ({ collectedAmount, targetAmount, size = 'm' }) {
    const percentage = ((collectedAmount / targetAmount) * 100).toFixed(0);

    const data = {
        datasets: [
            {
                data: [collectedAmount, targetAmount - collectedAmount],
                backgroundColor: ['rgb(252 211 77)', 'rgb(38, 38, 38)'],
                borderColor: ['rgb(252 211 77)', 'rgb(38, 38, 38)'],
                borderWidth: 1,
            },
        ],
    };

    const cutoutValue = size === 's' ? '70%' : '80%'

    const options = {
        cutout: cutoutValue,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    const sizeClasses = size === 's' ? 'w-16 h-16' : 'w-64 h-64';
    const percentageTextSize = size === 's' ? 'text-xs' : 'text-m';

    return (
        <div className="flex flex-col items-center">
            {size === 'm' && (
                <div className="text-2xl text-gray-200 mb-2">
                    {targetAmount}р
                </div>
            )}
            <div className={`relative ${sizeClasses}`}>
                <Pie data={data} options={options} />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    {size === 'm' && (
                        <div className="text-lg text-gray-200">{collectedAmount}р</div>
                    )}
                    <div className={`text-gray-500 ${percentageTextSize}`}>{percentage}%</div>
                </div>
            </div>
        </div>
    );
};
