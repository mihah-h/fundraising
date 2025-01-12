import { FundraisingType } from '@/shared/models/fundraising-type';

export type GroupType = {
    cashcollection_set: FundraisingType[];
    created_at: string;  // Дата создания в формате ISO 8601
    description: string; // Описание
    id: number;         // Уникальный идентификатор
    image: string;      // URL изображения (может быть пустым)
    info: string;       // Дополнительная информация
    name: string;       // Название группы
    owner: string;      // Владелец группы
}
