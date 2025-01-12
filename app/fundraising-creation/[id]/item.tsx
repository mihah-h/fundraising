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
import useAuth from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';


export default function FundraisingCreation({id}) {
    const { accessToken } = useAuth();

    const router = useRouter();

    // const handleCreate = () => {
    //     const collectionObject = {
    //         title,
    //         description,
    //         goal: target,
    //         amount,
    //         currency,
    //         endDate,
    //     };
    //     setTitle('')
    //     setDescription('')
    //     setTarget('')
    //     setAmount('')
    //     setCurrency('')
    //     setEndDate(null)
    //     console.log('Созданный объект сбора:', collectionObject);
    // };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const collectionObject = {
                name: name,
                description: description,
                image: avatar,
                required_amount: Number(requiredAmount),
                current_amount: 0,
                goal: goal,
                group: id,
            };

            const response = await fetch('https://assembly.lamart.site/api/cash-collections/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionObject),
            });

            setAvatar('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
            setName('');
            setDescription('');
            setRequiredAmount('');
            setGoal('');

            console.log(response);

            router.push('/group/' + id)
        } catch (err) {

        }
    };

    const [avatar, setAvatar] = useState('https://photogora.ru/img/product/big/17817/62bb11f8bf22c1346029859250147860.jpg');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [requiredAmount, setRequiredAmount] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [goal, setGoal] = useState('');
    const [group, setGroup] = useState('');

    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href={'/group/' + id}>
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft/> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Создание сбора</h1>
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
                    <Label htmlFor="target">Цель</Label>
                    <Input
                        type="text"
                        id="target"
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
                {/*<div className="grid grid-cols-2 gap-2">*/}
                <div>
                    <Label htmlFor="amount">Сумма</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Введиет сумму"
                        value={requiredAmount}
                        onChange={(e) => setRequiredAmount(e.target.value)}
                    />
                </div>
                {/* <Popover>*/}
                {/*    <PopoverTrigger asChild>*/}
                {/*        <div className="flex flex-col">*/}
                {/*            <Label style={{lineHeight: '24px'}}>Дата окончания</Label>*/}
                {/*            <Button*/}
                {/*                variant="outline"*/}
                {/*                className={cn(*/}
                {/*                    "justify-start text-left font-normal",*/}
                {/*                    !endDate && "text-muted-foreground"*/}
                {/*                )}*/}
                {/*            >*/}
                {/*                <CalendarIcon/>*/}
                {/*                {endDate ? format(endDate, "PPP") : <span>Выберите дату окончания</span>}*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </PopoverTrigger>*/}
                {/*    <PopoverContent className="w-auto p-0">*/}
                {/*        <Calendar*/}
                {/*            mode="single"*/}
                {/*            selected={endDate}*/}
                {/*            onSelect={setEndDate}*/}
                {/*            initialFocus*/}
                {/*        />*/}
                {/*    </PopoverContent>*/}
                {/*</Popover>*/}
                {/*</div>*/}
            </div>

            <div className="flex justify-end mt-10">
                {/*<Link href="/group">*/}
                    <Button onClick={handleCreate} size="lg">
                        Создать
                    </Button>
                {/*</Link>*/}
            </div>
        </div>
    );
}
