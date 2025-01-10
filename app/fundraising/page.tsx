'use client'

import { useState } from 'react';
import { Button } from '@/components/ui';
import { BookOpen, CalendarCheck, ChevronLeft, Edit2, Link2, MoreVertical, Target, Unlock } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pie } from 'react-chartjs-2';
import MyLineChart from '@/components/shared/pie-chart';
import PieChart from '@/components/shared/pie-chart';

export default function Fundraising() {

    const [amountRaised, setAmountRaised] = useState(500); // Пример собранной суммы
    const [goalAmount, setGoalAmount] = useState(1000); // Целевая сумма

    const data = {
        labels: ['Собрано', 'Осталось'],
        datasets: [
            {
                data: [amountRaised, goalAmount - amountRaised],
                backgroundColor: ['#4caf50', '#e0e0e0'],
                hoverBackgroundColor: ['#66bb6a', '#e0e0e0'],
            },
        ],
    };

    return (
        <div
            className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    {/*<button className="bg-blue-500 text-white px-4 py-2 rounded">Назад</button>*/}
                    <Link href="/group">
                        <Button variant="link" className="pl-0">
                            <ChevronLeft/> Назад
                        </Button>
                    </Link>
                    <div>
                        <Link href="/fundraising-edit">
                            <Button variant="outline" size="icon" className="mr-1.5">
                                <Edit2/>
                            </Button>
                        </Link>
                        <Button variant="outline" size="icon">
                            <MoreVertical/>
                        </Button>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-6">Сбор</h3>
                <div className="flex flex-col items-center mb-10">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                        alt="Логотип сбора"
                        className="w-32 h-32 rounded-full mb-2"
                    />
                    <h2 className="text-lg font-bold">8 марта</h2>
                </div>
                <ul className="w-full mb-10">
                    <li className="flex items-center gap-3">
                        <Target className="w-7 h-7 text-gray-500"/>
                        <div>
                            <p className="text-l">Собрать деньги на подарки девочкам на 8 марта</p>
                            <p className="text-gray-500 text-sm">Цель</p>
                        </div>
                    </li>
                    <li className="flex items-center mt-4 gap-3">
                        <BookOpen className="w-7 h-7 text-gray-500"/>
                        <div>
                            <p className="text-l">Деньги пойдут на тюльпаны(10шт) и мягкие игрушки в виде
                                мишки(10шт)</p>
                            <p className="text-gray-500 text-sm">Опсиание</p>
                        </div>
                    </li>
                    <li className="flex items-center mt-4 gap-3">
                        <CalendarCheck className="w-7 h-7 text-gray-500"/>
                        <div>
                            <p className="text-l">15.12.2024</p>
                            <p className="text-gray-500 text-sm">Конец сбора</p>
                        </div>
                    </li>
                    <li className="flex items-center mt-4 gap-3">
                        <Unlock className="w-7 h-7 text-gray-500"/>
                        <div>
                            <p className="text-l">Открттый сбор</p>
                            <p className="text-gray-500 text-sm">Тип сбора</p>
                        </div>
                    </li>
                    {/* Добавьте дополнительные элементы списка по необходимости */}
                </ul>

                <h3 className="text-xl font-bold mb-6">Собрано средств</h3>
                <div className="flex flex-col items-center mb-10">
                    <PieChart collectedAmount={500} targetAmount={5000} size={'m'}/>
                </div>

                <h3 className="text-xl font-bold mb-6">Участники</h3>
                <ul className="space-y-4 bg-neutral-900 p-2 mb-10">
                    <li className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded p-2 cursor-pointer">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                            alt="Логотип сбора"
                            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                        />
                        <div className="flex flex-row justify-between items-center w-full">
                            <div>
                                <p className="text-lg font-semibold">Иванов Иван</p>
                                <p className="text-gray-500 text-sm">vova@gmail.com</p>
                            </div>
                            <Link href="/fundraising-edit">
                                <Button variant="outline" size="icon">
                                    <MoreVertical/>
                                </Button>
                            </Link>
                        </div>
                    </li>
                    <li className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded p-2 cursor-pointer">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                            alt="Логотип сбора"
                            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                        />
                        <div className="flex flex-row justify-between items-center w-full">
                            <div>
                                <p className="text-lg font-semibold">Сергеев Сергей</p>
                                <p className="text-gray-500 text-sm">vova@gmail.com</p>
                            </div>
                            <Link href="/fundraising-edit">
                                <Button variant="outline" size="icon">
                                    <MoreVertical/>
                                </Button>
                            </Link>
                        </div>
                    </li>
                    <li className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded p-2 cursor-pointer">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                            alt="Логотип сбора"
                            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                        />
                        <div className="flex flex-row justify-between items-center w-full">
                            <div>
                                <p className="text-lg font-semibold">Костин Павел</p>
                                <p className="text-gray-500 text-sm">vova@gmail.com</p>
                            </div>
                            <Link href="/fundraising-edit">
                                <Button variant="outline" size="icon">
                                    <MoreVertical/>
                                </Button>
                            </Link>
                        </div>
                    </li>
                    {/* Добавьте больше элементов по аналогии */}
                </ul>

                <h3 className="text-xl font-bold mb-6">История денежных срдств</h3>
                <ul className="w-full mb-16">
                    <li className="flex justify-between">
                        <div className="flex gap-2.5">
                            <span className="text-emerald-500">
                                Пополнение
                            </span>
                            <p>
                                Иванов Иван
                            </p>
                        </div>
                        <span className="text-emerald-500">
                            + 2000р
                        </span>
                    </li>
                    <li className="flex justify-between mt-2">
                        <div className="flex gap-2.5">
                            <span className="text-emerald-500">
                                Пополнение
                            </span>
                            <p>
                                Сергеев Сергей
                            </p>
                        </div>
                        <span className="text-emerald-500">
                            + 1500р
                        </span>
                    </li>
                    <li className="flex justify-between mt-2">
                        <div className="flex gap-2.5">
                            <span className="text-emerald-500">
                                Пополнение
                            </span>
                            <p>
                                Костин Павел
                            </p>
                        </div>
                        <span className="text-emerald-500">
                            + 2500р
                        </span>
                    </li>
                    {/* Добавьте дополнительные пополнения по необходимости */}
                </ul>

                <Button variant="secondary">Завершить сбор</Button>
            </div>
        </div>
    );

}
