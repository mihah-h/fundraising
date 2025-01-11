'use client'

import { useEffect, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Container } from '@/components/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getGroups } from '@/shared/utils/getGroups';
import useAuth from '../shared/hooks/useAuth';
import * as React from 'react';
import Link from 'next/link';
import GroupCard from '@/app/components/group-card';
import { Group } from '@/shared/models/group';
import { GroupCardType } from '@/shared/models/group-card-type';

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
              className="container mx-auto max-w-screen-md rounded-md my-6 py-10 px-16 bg-neutral-900 border bg-card text-card-foreground shadow-sm">
              <p className="text-xl">
                  Сервис для создания сборов, авторизуйтесь, чтобы начать
              </p>
          </div>
      </Container>
  );
}
