'use client'

import { useEffect, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Container } from '@/components/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getGroups } from '@/shared/utils/getGroups';
import useAuth from '../shared/hooks/useAuth';
import * as React from 'react';
import Link from 'next/link';


type Fundraiser = {
    name: string;
    goalAmount: number;
    currentAmount: number;
    deadline: Date;
    participantCount: number;
};

const fundraisers: Fundraiser[] = [
    {
        name: "Помощь пострадавшим от землетрясения",
        goalAmount: 100000,
        currentAmount: 50000,
        deadline: new Date("2024-01-15"),
        participantCount: 200,
    },
    {
        name: "5 Б",
        goalAmount: 10000,
        currentAmount: 5000,
        deadline: new Date("2024-12-15"),
        participantCount: 15,
    },
    {
        name: "Постройка нового приюта для животных",
        goalAmount: 250000,
        currentAmount: 100000,
        deadline: new Date("2024-05-31"),
        participantCount: 500,
    },
    {
        name: "Поддержка малоимущих семей",
        goalAmount: 10000,
        currentAmount: 5000,
        deadline: new Date("2024-08-15"),
        participantCount: 150,
    },
];
export default function Home() {
    //
    // const [groups, setGroups] = useState([]);
    // const { accessToken } = useAuth();

    // useEffect(() => {
    //     const fetchGroups = async () => {
    //         try {
    //             const token = accessToken ; // Замените на ваш токен
    //             const groupsData = await getGroups(token);
    //             setGroups(groupsData);
    //             console.log(groups)
    //         } catch (err) {
    //             console.log(err)
    //         } finally {
    //
    //         }
    //     };
    //
    //     fetchGroups().then();
    // }, []);

  return (
      <Container>
          <div
              className="container mx-auto max-w-screen-md rounded my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row justify-between items-center">
                  <h1 className="text-xl font-semibold">Группы</h1>
                  <Button variant="secondary">Создать</Button>
              </div>
              <Input className="mt-4" placeholder="Поиск"/>
              <div className="mt-4">
                  {fundraisers.map((group) => (
                      <Link href="/group" key={group.name} className="flex flex-row justify-between items-center mt-3 hover:bg-neutral-700 rounded p-2.5 cursor-pointer">
                          <div className="flex flex-row justify-between items-center">
                              <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIyf1cKclYLS3ae0Oqv2Hv69WfUnRVdDzlQ&s" // Замените на путь к вашему логотипу
                                  alt="Логотип сбора"
                                  className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                              />
                              <div>
                                  <p className="text-l">{group.name}</p>
                                  <span className="text-xs text-neutral-500">{group.participantCount} участников</span>
                              </div>
                          </div>
                          <div>
                              <span className="text-xs text-neutral-500">{group.deadline.toLocaleDateString()}</span>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </Container>
  );
}
