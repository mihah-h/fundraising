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

export const groups: GroupCardType[] = [
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
        name: "9А",
        date: new Date("2025-01-10"),
        participantCount: 3,
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
        name: "7Б",
        date: new Date("2025-01-11"),
        participantCount: 2,
    },
];
export default function GroupList() {
    const [searchParameter, setSearchParameter] = useState('');

    const filteredGroups = groups.filter(group => {
        return (
            group.name.toLowerCase().includes(searchParameter.toLowerCase())
        );
    });

    //
    // const [groups, setGroups] = useState([]);
    // const { accessToken } = useAuth();

    // useEffect(() => {
    //     const fetchGroups = async () => {
    //         try {
    //             const token = accessToken ; // Замените на ваш токен
    //             const groupsData = await getGroups(token);
    //             setGroups(groupsData);
    //             console.log(groups)
    //         } catch (err) {
    //             console.log(err)
    //         } finally {
    //
    //         }
    //     };
    //
    //     fetchGroups().then();
    // }, []);

    return (
        <Container>
            <div
                className="container mx-auto max-w-screen-md rounded-md my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
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
                            avatar={group.avatar}
                            name={group.name}
                            participantCount={group.participantCount}
                            date={group.date.toLocaleDateString()}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}
