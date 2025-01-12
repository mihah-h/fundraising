'use client';

import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { Button, Input, Label, Textarea } from '@/components/ui';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from 'react';
import Link from 'next/link';
import useAuth from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface FundraisingCreationProps {
    id: string; // Укажите тип для id
}

export default function FundraisingCreation({ id }: FundraisingCreationProps) {
    const { accessToken } = useAuth();
    const router = useRouter();

    // Состояния для хранения данных о сборе
    const [avatar, setAvatar] = useState('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [requiredAmount, setRequiredAmount] = useState('');
    const [goal, setGoal] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        const collectionObject = {
            name,
            description,
            image: avatar,
            required_amount: Number(requiredAmount),
            current_amount: 0,
            goal,
            group: id,
        };

        try {
            const response = await fetch('https://assembly.lamart.site/api/cash-collections/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionObject),
            });

            if (!response.ok) {
                throw new Error('Failed to create fundraising');
            }

            // Сброс состояний после успешного создания
            setAvatar('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
            setName('');
            setDescription('');
            setRequiredAmount('');
            setGoal('');

            router.push('/group/' + id);
        } catch (error) {
            console.error('Error creating fundraising:', error);
            // Здесь можно добавить уведомление для пользователя о неудаче
        }
    };

    return (
        <div className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href={'/group/' + id}>
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft /> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Создание сбора</h1>
            <div className="flex justify-center mb-6">
                <label className="cursor-pointer">
                    <Popover>
                        <PopoverTrigger asChild>
                            <img
                                src={avatar}
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
                    <Label htmlFor="goal">Цель</Label>
                    <Input
                        type="text"
                        id="goal"
                        placeholder="Введите цель"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
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
                <div>
                    <Label htmlFor="amount">Сумма</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={requiredAmount}
                        onChange={(e) => setRequiredAmount(e.target.value)}
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
