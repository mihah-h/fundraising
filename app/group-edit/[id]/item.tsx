'use client'

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { Button, Input, Label, Popover, Textarea } from '@/components/ui';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '@/shared/hooks/useAuth';
import { GroupType } from '@/shared/models/group-type';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Loader from '@/components/shared/loader';
import { useRouter } from 'next/navigation';


export default function GroupEdit({id}) {
    const { accessToken } = useAuth()
    const router = useRouter();

    const [avatar, setAvatar] = useState('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) return; // Проверка наличия accessToken

            try {
                const response = await fetch(`https://assembly.lamart.site/api/cash-collections/groups/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json() as GroupType;
                setAvatar(data.image);
                setName(data.name);
                setDescription(data.description);
                console.log(data);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, accessToken]);

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const collectionObject = {
                name: name,
                description: description,
                info: '-',
                image: avatar || 'https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg',
            };

            const response = await fetch(`https://assembly.lamart.site/api/cash-collections/groups/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionObject),
            });

            console.log(response);

            router.push('/group/' + id)
        } catch (err) {

        }
    };

    if (!name) {
        return (
            <div
                className="container mx-auto max-w-screen-md rounded-md my-6
                 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm h-36">
                <Loader/>
            </div>
        );}

    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href={'/group/'+ id}>
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft /> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Редактирование группы</h1>
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
                            <Label className="mb-2" htmlFor="avatar">Сслыка на картинку</Label>
                            <Input
                                type="text"
                                id="avatar"
                                placeholder="Введите ссылку на картинку"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            ></Input>
                        </PopoverContent>
                    </Popover>
                    {/*<input type="file" className="hidden" onChange={(e) => console.log(e.target.files[0])}/>*/}
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
                <Link href="/group">
                    <Button onClick={handleEdit} size="lg">
                        Сохранить
                    </Button>
                </Link>
            </div>
        </div>
    );
}
