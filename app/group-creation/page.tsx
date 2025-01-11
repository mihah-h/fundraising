'use client'

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import { Button, Input, Label, Textarea } from '@/components/ui';
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { groups } from '../groups-list/page'


export default function GroupCreation() {
    const router = useRouter()

    const handleCreate = () => {
        const collectionObject = {
            avatar,
            name,
            description
        };
        console.log('Созданный объект группы:', collectionObject);
        setTimeout(() => {
            groups.push({
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s',
                name: name,
                date: new Date("2025-01-11"),
                participantCount: 0,
            })
            router.push('/groups-list')
        }, 1000)
    };

    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href="/">
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft/> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Создание сбора</h1>
            <div className="flex justify-center mb-6">
                <label className="cursor-pointer">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                        alt="Логотип сбора"
                        className="w-32 h-32 rounded-full border-2 border-gray-300 hover:border-blue-500"
                    />
                    <input type="file" className="hidden" onChange={(e) => console.log(e.target.files[0])}/>
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
