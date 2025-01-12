'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Popover } from '@/components/ui';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';

export default function Loader ({ avatar, name, gmail }) {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin m-auto")}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
    );
};
