'use client'

import * as React from "react"
import { BookOpen, ChevronLeft, Edit2, Link2, MoreVertical, Unlock } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { useState } from 'react';
import Link from 'next/link';
import PieChart from '@/components/shared/pie-chart';

export default function Group() {

    const [isAdit, setIsAdit] = useState(false);
    const [title, setTitle] = useState('5 Б');
    const [description, setDescription] = useState('Группа для сборов на мероприятия, праздники');
    return (
        <div className="flex">
            {/* Блок с информацией о группе */}
            <div className="fixed top-12 h-screen bg-neutral-900 p-12 pt-6" style={{width: '32rem'}}>
                <div className="flex justify-between mb-4">
                    <Link href='/'>
                        <Button variant="link" className="mb-6 pl-0">
                            <ChevronLeft /> Назад
                        </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => setIsAdit(!isAdit)}>
                        <Edit2 />
                    </Button>
                </div>
                {!isAdit ? <div>
                    <div className="flex flex-col items-center mb-14">
                        <div className="flex justify-center mb-2">
                            <label className="cursor-pointer">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                                    alt="Логотип сбора"
                                    className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-blue-500"
                                />
                                <input type="file" className="hidden" onChange={(e) => console.log(e.target.files[0])}/>
                            </label>
                        </div>
                        <h2 className="text-lg font-bold">{title}</h2>
                    </div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <BookOpen className="w-7 h-7 text-gray-500"/>
                                <div>
                                    <p className="text-l">{description}</p>
                                    <p className="text-gray-500 text-sm">Описание</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Unlock className="w-7 h-7 text-gray-500"/>
                                <div>
                                    <p className="text-l">Открытая группа</p>
                                    <p className="text-gray-500 text-sm">Тип группы</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Link2 className="w-7 h-7 text-gray-500"/>
                                <div>
                                    <p className="text-l">https://example.com/group</p>
                                    <p className="text-gray-500 text-sm">Ссылка на группу</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div>
                        <div className="flex justify-center mb-14">
                            <label className="cursor-pointer">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                                    alt="Логотип сбора"
                                    className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-blue-500"
                                />
                                <input type="file" className="hidden" onChange={(e) => console.log(e.target.files[0])}/>
                            </label>
                        </div>
                        <Input
                            type="text"
                            placeholder="Название"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-5"
                        />
                        <Textarea
                            placeholder="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-5"
                        />
                        <Button onClick={() => setIsAdit(false)} className="w-full" variant="default">Сохранить</Button>
                    </div>
                }
            </div>

            {/* Остальной контент страницы */}
            <div className="p-16 pt-12 w-2/3" style={{marginLeft: '32rem'}}>
                <div className="mb-8">
                    <div className="flex flex-row justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Открытые сборы</h3>
                        <Link href="/fundraising-creation">
                            <Button variant="secondary">Создать</Button>
                        </Link>
                    </div>
                    <ul className="space-y-4 bg-neutral-900 p-6 rounded">
                        <Link href="/fundraising" className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded p-2 cursor-pointer">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                                alt="Логотип сбора"
                                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                            />
                            <div className="flex flex-row justify-between items-center w-full">
                                <div>
                                    <p className="text-lg font-semibold">8 марта</p>
                                    <p className="text-gray-500 text-sm">15 участников</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="flex flex-col items-end">
                                        <p className="text-lg font-semibold">50000</p>
                                        <p className="text-gray-500 text-sm">Собрано из 10000р</p>
                                    </div>
                                    <PieChart collectedAmount={5000} targetAmount={10000} size={'s'}/>
                                </div>
                            </div>
                        </Link>
                    </ul>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Закрытые сборы</h3>
                    <ul className="space-y-4 bg-neutral-900 p-6 rounded">
                        <li className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded p-2 cursor-pointer">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                                alt="Логотип сбора"
                                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                            />
                            <div className="flex flex-row justify-between items-center w-full">
                                <div>
                                    <p className="text-lg font-semibold">23 февраля</p>
                                    <p className="text-gray-500 text-sm">20 участников</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="flex flex-col items-end">
                                        <p className="text-lg font-semibold">10000р</p>
                                        <p className="text-gray-500 text-sm">Собрано из 10000р</p>
                                    </div>
                                    <PieChart collectedAmount={10000} targetAmount={10000} size={'s'}/>
                                </div>
                            </div>
                        </li>
                        {/* Добавьте больше элементов по аналогии */}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Участники</h3>
                    <ul className="space-y-4 bg-neutral-900 p-6 rounded">
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
                </div>
            </div>
        </div>
    )
}
