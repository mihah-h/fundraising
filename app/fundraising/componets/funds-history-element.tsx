'use client'

import React from 'react';


export default function FundsHistoryElement ({ participantName, sum }) {

    return (
        <div className="flex justify-between">
            <div className="flex gap-2.5">
                <span className="text-emerald-500">Пополнение</span>
                <p>{ participantName }</p>
            </div>
            <span className="text-emerald-500">+ {sum}р</span>
        </div>
    );
};
