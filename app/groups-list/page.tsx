'use client'

import { useEffect, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Container } from '@/components/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getGroups } from '@/shared/utils/getGroups';
// import useAuth from '../shared/hooks/useAuth';
import * as React from 'react';
import Link from 'next/link';
import GroupCard from '@/app/components/group-card';
import { Group } from '@/shared/models/group';
import { GroupCardType } from '@/shared/models/group-card-type';
import useAuth from '@/shared/hooks/useAuth';
import { GroupType } from '@/shared/models/group-type';
import Loader from '@/components/shared/loader';


export default function GroupList() {
    const { accessToken } = useAuth();

    const [groupsList, setGroupsList] = useState<GroupType[]>(null);
    const [searchParameter, setSearchParameter] = useState('');
    const [filteredGroups, setFilteredGroups] = useState<GroupType[]>([]); // Инициализация состояния для отфильтрованных групп

    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) return; // Если токен недоступен, выходим из функции

            try {
                const response = await fetch('https://assembly.lamart.site/api/cash-collections/groups/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setGroupsList(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        if (groupsList) {
            const filtered = groupsList.filter(group => {
                return group.name.toLowerCase().includes(searchParameter.toLowerCase());
            });
            setFilteredGroups(filtered); // Обновляем состояние отфильтрованных групп
        }
    }, [groupsList, searchParameter]); // Этот эффект сработает при изменении groupsList или searchParameter

    function countUniqueParticipants(group: GroupType): number {
        const participantIds = new Set<number>(); // Используем Set для хранения уникальных идентификаторов участников

        // Проходим по всем сборам в группе
        for (const fundraising of group.cashcollection_set) {
            // Проходим по всем участникам в каждом сборе
            for (const participant of fundraising.participant_set) {
                participantIds.add(participant.id); // Добавляем идентификатор участника в Set
            }
        }

        return participantIds.size; // Возвращаем количество уникальных участников
    }

    if (!groupsList) {
        return (
            <div
                className="container mx-auto max-w-screen-md rounded-md my-6
                 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm h-36">
                <Loader/>
            </div>
    );}

    return (
        <Container>
            <div
                className="container mx-auto max-w-screen-md rounded-md my-6 py-10
                px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-xl font-semibold">Группы</h1>
                    <Link href="/group-creation">
                        <Button variant="secondary">Создать</Button>
                    </Link>
                </div>
                <Input
                    className="mt-4"
                    placeholder="Поиск"
                    value={searchParameter}
                    onChange={(e) => setSearchParameter(e.target.value)}
                />
                <div className="flex flex-col gap-1 mt-4">
                    {filteredGroups.map((group, index) => (
                        <GroupCard
                            key={index}
                            id={String(group.id)}
                            avatar={group.image}
                            name={group.name}
                            date={group.created_at}
                            participantCount={countUniqueParticipants(group)}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}
