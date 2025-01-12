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
import useAuth from '@/shared/hooks/useAuth';
import { GroupType } from '@/shared/models/group-type';
import Loader from '@/components/shared/loader';
import { FundraisingType } from '@/shared/models/fundraising-type';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

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

export default function Fundraising({id}) {
    const { accessToken } = useAuth();
    const router = useRouter();

    const [fundraising, setFundraising] = useState<FundraisingType>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://assembly.lamart.site/api/cash-collections/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();
                    setFundraising(data);
                    console.log(fundraising, 'fun')
                } catch (error) {
                    console.log('err');
                }
            };

            fetchData();
        }
    }, []);

    const deleteFundraising = async (e) => {
        // e.preventDefault();

        try {
            const response = await fetch(`https://assembly.lamart.site/api/cash-collections/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            router.push('/group/' + fundraising.group)
            console.log(response)
        } catch (error) {
            console.log('err');
        }

    }

    const handleCopy = () => {
        const textToCopy = 'https://t.me/localCutterrorBot?startapp=payment-' + fundraising.uuid;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // alert('Ссылка скопирована');
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    };

    if (!fundraising) {
        return (
            <div
                className="mt-28">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-screen-md rounded-md my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    <Link href={'/group/' + fundraising.group}>
                        <Button variant="link" className="pl-0">
                            <ChevronLeft /> Назад
                        </Button>
                    </Link>
                    <div>
                        <Link href={'/fundraising-edit/' + id}>
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
                                <Button onClick={deleteFundraising} className="pl-3 justify-start text-red-500 hover:text-red-500" variant="ghost">
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
                            <p className="text-l">{fundraising.goal}</p>
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
                            <p className="text-l">{new Date(fundraising.created_at).toLocaleDateString()}</p>
                            <p className="text-gray-500 text-sm">Дата создания</p>
                        </div>
                    </li>
                    <li className="flex items-center mt-4 gap-3">
                        <LockIcon className="w-7 h-7 text-gray-500" />
                        <div>
                            <p className="text-l">Закрытый</p>
                            <p className="text-gray-500 text-sm">Тип сбора</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <Link2 className="w-7 h-7 text-gray-500" />
                        <div>
                            <p
                                onClick={handleCopy}
                                className="text-l hover:underline"
                            >
                                {'https://t.me/localCutterrorBot?startapp=payment-' + fundraising.uuid}
                            </p>
                            <p className="text-gray-500 text-sm">Ссылка на сбор</p>
                        </div>
                    </li>
                </ul>

                <h3 className="text-xl font-bold mb-6">Собрано средств</h3>
                <div className="flex flex-col items-center mb-10">
                    <PieChart collectedAmount={fundraising.current_amount} targetAmount={fundraising.required_amount} size={'m'} />
                </div>

                <h3 className="text-xl font-bold mb-6">Участники</h3>
                <div className="flex flex-col gap-1 bg-neutral-900 p-2 mb-10">
                    {fundraising.participant_set.map((participant, index) => (
                        <ParticipantCard
                            key={index}
                            avatar={participant.image}
                            name={participant.username}
                        />
                    ))}
                </div>

                <h3 className="text-xl font-bold mb-6">История движения средств</h3>
                <div className="flex flex-col gap-4 w-full mb-16">
                    {fundraising.participant_set.map((fundsHistoryElement, index) => (
                        <FundsHistoryElement
                            key={index}
                            participantName={fundsHistoryElement.username}
                            sum={fundsHistoryElement.amount}
                        />
                    ))}
                </div>

                {/*<Button variant="secondary">Завершить сбор</Button>*/}
            </div>
        </div>
    );
}
