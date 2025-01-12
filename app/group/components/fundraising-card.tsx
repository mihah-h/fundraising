'use client'

import React from 'react';
import Link from 'next/link';
import PieChart from '@/components/shared/pie-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function FundraisingCard ({ uuid, avatar, name, participantsNumber, collectedAmount, targetAmount }) {
    return (
        <Link
            className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer"
            href={'/fundraising/'+ uuid}
        >
            <Avatar
                className="w-16 h-16 mr-4"
            >
                <AvatarImage
                    src={avatar || 'https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg'}
                    alt="@shadcn"
                />
                <AvatarFallback className="bg-blue-400"></AvatarFallback>
            </Avatar>
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p className="text-lg font-semibold">{ name }</p>
                    <p className="text-gray-500 text-sm">
                        { participantsNumber ?? 0 }
                        {participantsNumber === 1 ? ' участник' : participantsNumber === 2 || participantsNumber === 3 || participantsNumber === 4 ? ' участника' : ' участников' }
                    </p>
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
