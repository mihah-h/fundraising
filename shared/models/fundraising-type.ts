import { ParticipantType } from '@/shared/models/participant-type';

export type FundraisingType = {
    created_at: string;         // Дата создания в формате ISO 8601
    current_amount: number;     // Текущая сумма
    description: string;        // Описание
    goal: string;               // Цель
    group: number;              // Идентификатор группы
    id: number;                 // Уникальный идентификатор
    image: string;              // URL изображения (может быть пустым)
    name: string;               // Название сбора
    owner: string;              // Владелец сбора
    participant_set: ParticipantType[];     // Массив участников (можно уточнить тип)
    required_amount: number;     // Необходимая сумма
    tg_url: string;             // URL Telegram
    uuid: string;               // Уникальный идентификатор в формате UUID
}
