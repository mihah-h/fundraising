'use client'

import * as React from "react"
import { BookOpen, ChevronLeft, Edit2, Link2, LockIcon, MoreVertical, Unlock } from 'lucide-react';
import { Button, Input, Popover, Textarea } from '@/components/ui';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ParticipantCard from '@/components/shared/participantCard';
import { Participant } from '@/shared/models/participant';
import { FundraisingCardType } from '@/shared/models/fundraising-card-type';
import FundraisingCard from '@/app/group/components/fundraising-card';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import useAuth from '@/shared/hooks/useAuth';
import { GroupType } from '@/shared/models/group-type';
import Loader from '@/components/shared/loader';

// const group: Group = {
//     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//     name: '7Б',
//     description: 'Группа для сбора средств, 7Б класса, школы №32',
//     date: new Date('2025-01-11'),
//     type: 'Закрытая',
//     link: 'https://assembly.lamart.site/group/6',
//     participantCount: 2,
//     participants: [
//         {
//             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//             name: 'Владимир Иванов',
//             gmail: 'vova@gmail.com'
//         },
//         {
//             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//             name: 'Сергей Сергеев',
//             gmail: 'ser@gmail.com'
//         }
//     ],
//     openFundraisers: [
//         {
//             id: 1,
//             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//             name: '8 марта',
//             participantsNumber: 2,
//             collectedAmount: 2400,
//             targetAmount: 5000
//         },
//         {
//             id: 2,
//             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//             name: 'Новый год',
//             participantsNumber: 2,
//             collectedAmount: 2000,
//             targetAmount: 3000
//         },
//     ],
//     closedFundraisers: [
//         {
//             id: 1,
//             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
//             name: '23 февраля',
//             participantsNumber: 2,
//             collectedAmount: 3000,
//             targetAmount: 3000
//         },
//     ]
// };

export default function Group({id}) {
    const { accessToken } = useAuth();
    const router = useRouter();

    const [group, setGroup] = useState<GroupType>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://assembly.lamart.site/api/cash-collections/groups/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();
                    setGroup(data);
                    console.log(data)
                } catch (error) {
                    console.log('err');
                }
            };

            fetchData();
        }
    }, []);

    const deleteGroup = async (e) => {
        // e.preventDefault();

        try {
            const response = await fetch(`https://assembly.lamart.site/api/cash-collections/groups/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            router.push('/groups-list')
            console.log(response)
        } catch (error) {
            console.log('err');
        }

    }

    function getUniqueParticipantsFromGroup(group) {
        const uniqueIds = new Set();
        const uniqueParticipants = [];

        // Проходим по каждому сбору в cashcollection_set
        group.cashcollection_set.forEach(fundraising => {
            fundraising.participant_set.forEach(participant => {
                // Проверяем, уникален ли участник по id
                if (!uniqueIds.has(participant.id)) {
                    uniqueIds.add(participant.id);
                    uniqueParticipants.push(participant); // Добавляем уникального участника
                }
            });
        });

        console.log(uniqueParticipants, 'un')
        return uniqueParticipants;

    }

    const handleCopy = () => {
        const textToCopy = 'https://t.me/localCutterrorBot?startapp=group-' + group.id;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // alert('Ссылка скопирована');
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    };

    if (!group) {
        return (
            <div
                className="mt-28">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="flex">
            {/* Блок с информацией о группе */}
            <div className="fixed top-12 h-screen bg-neutral-900 p-12 pt-6" style={{width: '32rem'}}>
                <div className="flex justify-between mb-4">
                    <Link href='/groups-list'>
                        <Button variant="link" className="mb-6 pl-0">
                            <ChevronLeft /> Назад
                        </Button>
                    </Link>
                    <div>
                        <Link href={'/group-edit/' + id}>
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
                                    Изменить тип группы
                                </Button>
                                <Button onClick={deleteGroup} className="pl-3 justify-start text-red-500 hover:text-red-500" variant="ghost">
                                    Удалить группу
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center mb-14">
                        <div className="flex justify-center mb-2">
                            <img
                                src={group.image || 'https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg'}
                                alt="Логотип сбора"
                                className="w-24 h-24 rounded-full"
                            />
                        </div>
                        <h2 className="text-lg font-bold">{group.name}</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <BookOpen className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">{group.description}</p>
                                <p className="text-gray-500 text-sm">Описание</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <LockIcon className="w-7 h-7 text-gray-500" />
                            <div>
                                <p className="text-l">Закрытая</p>
                                <p className="text-gray-500 text-sm">Тип группы</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Link2 className="w-7 h-7 text-gray-500"/>
                            <div>
                                <p
                                    onClick={handleCopy}
                                    className="text-l hover:underline cursor-pointer"
                                >
                                    {'https://t.me/localCutterrorBot?startapp=group-' + group.id}
                                </p>
                                <p className="text-gray-500 text-sm">Ссылка на группу</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Остальной контент страницы */}
            <div className="p-16 pt-12 w-2/3" style={{marginLeft: '32rem'}}>
                <div className="mb-8">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <h3 className="text-xl font-bold">Cборы</h3>
                        <Link href={'/fundraising-creation/' + id}>
                            <Button variant="secondary">Создать</Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1 bg-neutral-900 p-5 rounded-md">
                    {group.cashcollection_set.map((collection, index) => (
                            <FundraisingCard
                                key={index}
                                uuid={collection.uuid}
                                avatar={collection.image}
                                name={collection.name}
                                participantsNumber={collection.participant_set.length}
                                collectedAmount={collection.current_amount}
                                targetAmount={collection.required_amount}
                            />
                        ))}
                    </div>
                </div>

                {/*<div className="mb-8">*/}
                {/*    <h3 className="text-xl font-bold mb-4">Закрытые сборы</h3>*/}
                {/*    <div className="flex flex-col gap-1 bg-neutral-900 p-5 rounded-md">*/}
                {/*        {group.closedFundraisers.map((collection, index) => (*/}
                {/*            <FundraisingCard*/}
                {/*                key={index}*/}
                {/*                avatar={collection.avatar}*/}
                {/*                name={collection.name}*/}
                {/*                participantsNumber={collection.participantsNumber}*/}
                {/*                collectedAmount={collection.collectedAmount}*/}
                {/*                targetAmount={collection.targetAmount}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div>
                    <h3 className="text-xl font-bold mb-4">Участники</h3>
                    <div className="flex flex-col gap-1 bg-neutral-900 p-5 rounded-md">
                        {getUniqueParticipantsFromGroup(group).map((participant, index) => (
                            <ParticipantCard
                                key={index}
                                avatar={participant.image}
                                name={participant.username}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
