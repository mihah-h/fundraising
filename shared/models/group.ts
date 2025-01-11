import { Participant } from '@/shared/models/participant';
import { FundraisingCardType } from '@/shared/models/fundraising-card-type';

export type Group = {
    avatar: string,
    name: string;
    description: string;
    date: Date;
    type: string;
    link: string;
    participantCount: number;
    participants: Participant[],
    openFundraisers: FundraisingCardType[];
    closedFundraisers: FundraisingCardType[];
};
