'use client'

import React from 'react';
import { Button, Popover } from '@/components/ui';
import { MoreVertical } from 'lucide-react';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ParticipantCard ({ avatar, name, gmail }) {

    return (
        <div className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer">
            <img
                src={avatar}
                alt="аватар юзера"
                className="w-16 h-16 rounded-full border-2 border-gray-300 mr-5"
            />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="text-gray-500 text-sm">{gmail}</p>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <Button
                            variant="ghost"
                            className="pl-3 justify-start text-red-500 hover:text-red-500"
                        >Исключить из группы</Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
