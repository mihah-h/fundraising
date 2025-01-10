'use client'

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import { Button, Input, Select, Textarea } from '@/components/ui';
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from 'next/router';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';


export default function FundraisingEdit() {
    const handleCreate = () => {
        // const collectionObject = {
        //     title,
        //     description,
        //     goal,
        //     amount,
        //     currency,
        //     endDate,
        // };
        // setTitle('')
        // setDescription('')
        // setGoal('')
        // setAmount('')
        // setCurrency('')
        // setEndDate(null)
        // console.log('Созданный объект сбора:', collectionObject);

    };

    const [title, setTitle] = useState('8 марта');
    const [title2, setTitle2] = useState('Подарок');
    const [description, setDescription] = useState('Деньги пойдут на тюльпаны(10шт) и мягкие игрушки в виде мишки(10шт)');
    const [goal, setGoal] = useState('10000');
    const [amount, setAmount] = useState('10000');
    const [currency, setCurrency] = useState('');
    const [endDate, setEndDate] = useState<Date>(new Date());
    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href="/fundraising">
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft /> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Редактирование сбора</h1>
            <div className="flex justify-center mb-6">
                <label className="cursor-pointer">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                        alt="Логотип сбора"
                        className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-blue-500"
                    />
                    <input type="file" className="hidden" onChange={(e) => console.log(e.target.files[0])}/>
                </label>
            </div>

            <div className="space-y-2">
                <Input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Цель"
                    value={title2}
                    onChange={(e) => setTitle2(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        type="number"
                        placeholder="Сумма"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon/>
                                {endDate ? format(endDate, "PPP") : <span>Дата окончания</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex justify-end mt-10">
                <Link href="/group">
                    <Button onClick={handleCreate} size="lg">
                        Сохранить
                    </Button>
                </Link>
            </div>
        </div>
    );
}
