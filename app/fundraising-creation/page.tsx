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


export default function FundraisingCreation() {
    const handleCreate = () => {
        const collectionObject = {
            title,
            description,
            goal: target,
            amount,
            currency,
            endDate,
        };
        setTitle('')
        setDescription('')
        setTarget('')
        setAmount('')
        setCurrency('')
        setEndDate(null)
        console.log('Созданный объект сбора:', collectionObject);
    };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [target, setTarget] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [endDate, setEndDate] = useState<Date>();
    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <Link href="/fundraising">
                <Button variant="link" className="mb-6 pl-0">
                    <ChevronLeft/> Назад
                </Button>
            </Link>
            <h1 className="text-xl font-semibold mb-8">Создание сбора</h1>
            <div className="flex justify-center mb-6">
                <label className="cursor-pointer">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s"
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="amount">Сумма</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Введиет сумму"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex flex-col">
                                <Label style={{lineHeight: '24px'}}>Дата окончания</Label>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon/>
                                    {endDate ? format(endDate, "PPP") : <span>Выберите дату окончания</span>}
                                </Button>
                            </div>
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
                        Создать
                    </Button>
                </Link>
            </div>
        </div>
    );
}
