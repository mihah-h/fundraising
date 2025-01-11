'use client'

import React from 'react';
import Link from 'next/link';
import PieChart from '@/components/shared/pie-chart';

export default function FundraisingCard ({ id, avatar, name, participantsNumber, collectedAmount, targetAmount }) {
    return (
        <Link
            className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer"
            href="/fundraising"
        >
            <img
                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                src={ avatar }
                alt="Логотип сбора"
            />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p className="text-lg font-semibold">{ name }</p>
                    <p className="text-gray-500 text-sm">{ participantsNumber } участника</p>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col items-end">
                        <p className="text-lg font-semibold">{ collectedAmount }р</p>
                        <p className="text-gray-500 text-sm">Собрано из { targetAmount }р</p>
                    </div>
                    <PieChart collectedAmount={ collectedAmount } targetAmount={ targetAmount } size={'s'}/>
                </div>
            </div>
        </Link>
    );
};
