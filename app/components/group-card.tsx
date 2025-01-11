'use client'

import React from 'react';
import Link from 'next/link';

export default function GroupCard ({ id, avatar, name, participantCount, date }) {
    return (
        <Link
            className="flex flex-row justify-between items-center hover:bg-neutral-700 rounded-md p-3 cursor-pointer"
            href="/group"
        >
            <img
                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 mr-5"
                src={ avatar }
                alt="Логотип сбора"
            />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p className="text-lg font-semibold">{ name }</p>
                    <p className="text-gray-500 text-sm">{ participantCount } участника</p>
                </div>
                <div className="flex items-center">
                    <span className="text-xs text-neutral-500">{ date }</span>
                </div>
            </div>
        </Link>
    );
};
