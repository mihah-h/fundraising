import { Participant } from '@/shared/models/participant';
import { FundsHistory } from '@/shared/models/funds-history';

export type Fundraising = {
    id: number,
    name: string,
    target: string,
    description: string,
    deadline: Date,
    type: string,
    collectedAmount: number,
    targetAmount: number,
    participants: Participant[],
    fundsHistory: FundsHistory[],
}
