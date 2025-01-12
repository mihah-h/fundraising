'use client'

import React from 'react';
import { Avatar, Button, Popover } from '@/components/ui';
import { MoreVertical } from 'lucide-react';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ParticipantCard ({ avatar, name }) {

    return (
        <div className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer">
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
                    <p className="text-lg font-semibold">{name}</p>
                    {/*<p className="text-gray-500 text-sm">{email}</p>*/}
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
