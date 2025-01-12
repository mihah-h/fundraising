'use client';

import * as React from "react";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { Button, Input, Label, Textarea } from '@/components/ui';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FundraisingType } from '@/shared/models/fundraising-type';
import useAuth from '@/shared/hooks/useAuth';

export default function FundraisingEdit({ id }) {
    const { accessToken } = useAuth();
    const router = useRouter();

    // Инициализация состояний с пустыми строками
    const [avatar, setAvatar] = useState('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [description, setDescription] = useState('');
    const [requiredAmount, setRequiredAmount] = useState('');

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


                    const data = await response.json() as FundraisingType;
                    setAvatar(data.image || avatar); // Убедитесь, что значение не undefined
                    setName(data.name || '');
                    setTarget(data.goal || '');
                    setDescription(data.description || '');
                    setRequiredAmount(data.required_amount?.toString() || '');
                } catch (error) {
                    console.error('Error fetching fundraising data:', error);
                }
            };

            fetchData();
        }
    }, [id, accessToken]); // Добавлена зависимость accessToken

    const handleEdit = async (e) => {
        e.preventDefault();

        const collectionObject = {
            name,
            description,
            image: avatar || 'https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg',
            goal: target,
            required_amount: Number(requiredAmount)
        };

        try {
            const response = await fetch(`https://assembly.lamart.site/api/cash-collections/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionObject),
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить сбор');
            }

            router.push('/fundraising/' + id);
        } catch (error) {
            console.error('Error updating fundraising:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href={'/fundraising/' + id}>
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft /> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Редактирование сбора</h1>
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
                    <Label htmlFor="target">Цель</Label>
                    <Input
                        type="text"
                        id="target"
                        placeholder="Введите цель"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
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
                <Button onClick={handleEdit} size="lg">
                    Сохранить
                </Button>
            </div>
        </div>
    );
}
