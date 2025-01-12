'use client'

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface GroupCardProps {
    id: string; // или другой тип, в зависимости от ваших данных
    avatar: string; // или другой тип
    name: string; // или другой тип
    participantCount: number; // или другой тип
    date: string; // или другой тип
}

export default function GroupCard ({ id, avatar, name, participantCount, date }: GroupCardProps) {
    return (
        <Link
            className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer"
            href={'/group/' + id}
        >
            <Avatar
                className="w-16 h-16 mr-4"
            >
                <AvatarImage
                    src={avatar || undefined}
                    alt="@shadcn"
                />
                <AvatarFallback className="bg-blue-400"></AvatarFallback>
            </Avatar>
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p className="text-lg font-semibold">{ name }</p>
                    <p className="text-gray-500 text-sm">
                        { participantCount ?? 0 }
                        {participantCount === 1 ? ' участник' : participantCount === 2 || participantCount === 3 || participantCount === 4 ? ' участника' : ' участников' }
                    </p>
                </div>
                <div className="flex items-center">
                    <span className="text-xs text-neutral-500">{ new Date(date).toLocaleDateString() }</span>
                </div>
            </div>
        </Link>
    );
};
