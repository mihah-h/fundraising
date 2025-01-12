'use client';

import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { Button, Input, Label, Textarea } from '@/components/ui';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/shared/hooks/useAuth';

export default function GroupCreation() {
    const router = useRouter();
    const { accessToken } = useAuth();

    const [avatar, setAvatar] = useState('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            console.error('Access token is missing');
            return; // Прекращаем выполнение, если токен отсутствует
        }

        try {
            const collectionObject = {
                name: name,
                description: description,
                info: '-',
                image: avatar,
            };

            const response = await fetch('https://assembly.lamart.site/api/cash-collections/groups/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionObject),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            // Сброс состояния формы
            setAvatar('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
            setName('');
            setDescription('');

            console.log('Group created successfully', await response.json());

            router.push('/groups-list');
        } catch (err) {
            console.error('Error creating group:', err);
        }
    };

    return (
        <div className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href="/groups-list">
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft /> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Создание группы</h1>
            <div className="flex justify-center mb-6">
                <label className="cursor-pointer">
                    <Popover>
                        <PopoverTrigger asChild>
                            <img
                                src={avatar || 'https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg'}
                                alt="Логотип сбора"
                                className="w-32 h-32 rounded-full border-2 border-gray-300 hover:border-blue-500"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full">
                            <Label className="mb-2" htmlFor="avatar">Ссылка на картинку</Label>
                            <Input
                                type="text"
                                id="avatar"
                                placeholder="Введите ссылку на картинку"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                        </PopoverContent>
                    </Popover>
                </label>
            </div>

            <div className="flex flex-col gap-3">
                <div>
                    <Label htmlFor="name">Название</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Введите название"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                        id="description"
                        placeholder="Введите описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-10">
                <Button onClick={handleCreate} size="lg">
                    Создать
                </Button>
            </div>
        </div>
    );
}
