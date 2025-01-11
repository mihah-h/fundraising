'use client'

import { useEffect, useState } from 'react';
import { Button, Popover } from '@/components/ui';
import {
    BookOpen,
    CalendarCheck,
    ChevronLeft,
    Edit2,
    Link2,
    LockIcon,
    MoreVertical,
    Target,
    Unlock
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pie } from 'react-chartjs-2';
import MyLineChart from '@/components/shared/pie-chart';
import PieChart from '@/components/shared/pie-chart';
import ParticipantCard from '@/components/shared/participantCard';
import { Participant } from '@/shared/models/participant';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import FundraisingCard from '@/app/group/components/fundraising-card';
import { Fundraising } from '@/shared/models/fundraising';
import FundsHistoryElement from '@/app/fundraising/componets/funds-history-element';

const fundraising: Fundraising = {
    id: 1,
    name: "8 марта",
    target: "Поздравить девочек с 8 марта",
    description: "Сбор средств на подарок девочкам 7Б на 8 марта",
    deadline: new Date("2025-03-02"),
    type: "Закрытый",
    collectedAmount: 2400,
    targetAmount: 5000,
    participants: [
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
            name: 'Владимир Иванов',
            gmail: 'vova@gmail.com'
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
            name: 'Сергей Сергеев',
            gmail: 'ser@gmail.com'
        }
    ],
    fundsHistory: [
        {
            participantName: "Владимир Иванов",
            sum: 1000
        },
        {
            participantName: "Сергей Сергеев",
            sum: 1400
        }
    ]
};

export default function Fundraising() {
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentVisible(true);
        }, 520);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, []);

    return (
        <div className="container mx-auto max-w-screen-md rounded-md my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            {isContentVisible && (
                <div className="flex flex-col">
                    <div className="flex justify-between w-full mb-4">
                        <Link href="/group">
                            <Button variant="link" className="pl-0">
                                <ChevronLeft /> Назад
                            </Button>
                        </Link>
                        <div>
                            <Link href="/fundraising-edit">
                                <Button variant="ghost" size="icon" className="mr-1.5">
                                    <Edit2 />
                                </Button>
                            </Link>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col w-full">
                                    <Button className="pl-3 justify-start" variant="ghost">
                                        Изменить тип сбора
                                    </Button>
                                    <Button className="pl-3 justify-start text-red-500 hover:text-red-500" variant="ghost">
                                        Удалить сбор
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-6">Сбор</h3>
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s"
                            alt="Логотип сбора"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h2 className="text-xl font-bold">{fundraising.name}</h2>
                    </div>
                    <ul className="w-full mb-10">
                        <li className="flex items-center gap-3">
                            <Target className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">{fundraising.target}</p>
                                <p className="text-gray-500 text-sm">Цель</p>
                            </div>
                        </li>
                        <li className="flex items-center mt-4 gap-3">
                            <BookOpen className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">{fundraising.description}</p>
                                <p className="text-gray-500 text-sm">Описание</p>
                            </div>
                        </li>
                        <li className="flex items-center mt-4 gap-3">
                            <CalendarCheck className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">{fundraising.deadline.toLocaleDateString()}</p>
                                <p className="text-gray-500 text-sm">Конец сбора</p>
                            </div>
                        </li>
                        <li className="flex items-center mt-4 gap-3">
                            <LockIcon className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">{fundraising.type}</p>
                                <p className="text-gray-500 text-sm">Тип сбора</p>
                            </div>
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold mb-6">Собрано средств</h3>
                    <div className="flex flex-col items-center mb-10">
                        <PieChart collectedAmount={fundraising.collectedAmount} targetAmount={fundraising.targetAmount} size={'m'} />
                    </div>

                    <h3 className="text-xl font-bold mb-6">Участники</h3>
                    <div className="flex flex-col gap-1 bg-neutral-900 p-2 mb-10">
                        {fundraising.participants.map((participant, index) => (
                            <ParticipantCard
                                key={index}
                                avatar={participant.avatar}
                                name={participant.name}
                                gmail={participant.gmail}
                            />
                        ))}
                    </div>

                    <h3 className="text-xl font-bold mb-6">История движения средств</h3>
                    <div className="flex flex-col gap-4 w-full mb-16">
                        {fundraising.fundsHistory.map((fundsHistoryElement, index) => (
                            <FundsHistoryElement
                                key={index}
                                participantName={fundsHistoryElement.participantName}
                                sum={fundsHistoryElement.sum}
                            />
                        ))}
                    </div>

                    <Button variant="secondary">Завершить сбор</Button>
                </div>
            )}
        </div>
    );
}
