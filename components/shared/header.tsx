'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '@/components/shared';
import { LoginButton } from '@telegram-auth/react';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-2'>
                <div>

                </div>
                <LoginButton
                    botUsername="TestNextMiniAppBot"
                    authCallbackUrl="/path/to/callback/url"
                    buttonSize="large" // "large" | "medium" | "small"
                    cornerRadius={5} // 0 - 20
                    showAvatar={true} // true | false
                    lang="en"
                />
            </Container>
        </header>
    );
}
