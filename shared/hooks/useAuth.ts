import { useEffect, useState } from 'react';

export default function useAuth() {

    const [accessToken, setAccessToken] = useState(null); // Изначально устанавливаем в null

    useEffect(() => {
        // Проверяем, доступен ли window (т.е. мы находимся в браузере)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token); // Устанавливаем токен из localStorage
        }
    }, []); // Пустой массив зависимостей, чтобы выполнить только один раз при монтировании

    return { accessToken };
}
