'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '@/components/shared';
import { LoginButton, TelegramAuthData } from '@telegram-auth/react';
import Link from 'next/link';
import useAuth from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation'

interface Props {
    className?: string;
}


// const mockHandler = async (data: TelegramAuthData): Promise<{ access:  string,
//     refresh: string}> => {
//     console.log(data)
//     const jsonData = {
//         access:  "access-token",
//         refresh: "refresh-token"
//     }
//     // Моковый запрос на сервер
//     return await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(jsonData);
//         }, 1000);
//     });
// };
//
// type authRespose = {
//     refresh: string,
//     access: string
// }

// const setLocalStorage = (token: { access:  string,
//     refresh: string}) => {
//     localStorage.setItem('access', token.access)
//     localStorage.setItem('refresh', token.refresh)
// }

export const Header: React.FC<Props> = ({className}) => {
    const { accessToken } = useAuth();
    const router = useRouter()

    return (
        <header className={cn('bg-neutral-900 border fixed top-0 left-0 w-full h-14 z-50', className)}>
            <Container className='flex items-center justify-between py-3'>
                <Link
                    className="text-2xl font-bold"
                    href={accessToken ? '/groups-list' : '/'}
                >
                    Fundraising
                </Link>
                <LoginButton
                    botUsername="TestNextMiniAppBot"
                    onAuthCallback={(user) => {
                        user.last_name = user.last_name || "";

                        fetch("https://assembly.lamart.site/api/users/telegram-auth?" + new URLSearchParams(user))
                            .then( async (response) => {
                                const data = await response.json();
                                localStorage.setItem('accessToken', data.access);
                                // localStorage.setItem('refreshToken', data.refresh);
                                console.log(data)
                                router.push('/groups-list');
                            })
                        console.log('Hello, user!', user);
                    }}
                    buttonSize="medium" // "large" | "medium" | "small"
                    cornerRadius={5} // 0 - 20
                    showAvatar={true} // true | false
                    lang="ru"
                />
            </Container>
        </header>
    );
}
