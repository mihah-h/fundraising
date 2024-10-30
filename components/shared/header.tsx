'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '@/components/shared';
import { LoginButton, TelegramAuthData } from '@telegram-auth/react';

interface Props {
    className?: string;
}

const mockHandler = async (data: TelegramAuthData): Promise<{ access:  string,
    refresh: string}> => {
    console.log(data)
    const jsonData = {
        access:  "access-token",
        refresh: "refresh-token"
    }
    // Моковый запрос на сервер
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(jsonData);
        }, 1000);
    });
};

const setLocalStorage = (token: { access:  string,
    refresh: string}) => {
    localStorage.setItem('access', token.access)
    localStorage.setItem('refresh', token.refresh)
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-2'>
                <div>

                </div>
                <LoginButton
                    botUsername="TestNextMiniAppBot"
                    onAuthCallback={(data) => mockHandler(data).then((token) => setLocalStorage(token))}
                    buttonSize="large" // "large" | "medium" | "small"
                    cornerRadius={5} // 0 - 20
                    showAvatar={true} // true | false
                    lang="ru"
                />
            </Container>
        </header>
    );
}
