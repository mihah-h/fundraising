import { useEffect, useState } from 'react';

export default function useAuth() {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token);
            console.log(accessToken, 'tokenn')

        }
    }, []); // Пустой массив зависимостей, чтобы выполнить эффект только один раз
    return { accessToken };
}
