import { useEffect, useState } from 'react';

export default function useAuth() {
    // localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MjA5NDA4LCJpYXQiOjE3MzY2MTc0MDgsImp0aSI6IjJjYjk1YTcxYTdmMDQyYjM5NDIzYWU5OTRhMjlmOGM0IiwidXNlcl9pZCI6MX0.qwaYQxTbFa-Pw855xjizwVF3Z6ZjfStgyD9YrKqgtLk');
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    // useEffect(() => {
    //     const refreshAccessToken = async () => {
    //         try {
    //             const refreshToken = localStorage.getItem('refreshToken');
    //             const response = await fetch('https://assembly.lamart.site/api/auth/refresh', {
    //                 method: 'POST',
    //                 body: JSON.stringify({ refreshToken }),
    //             });
    //
    //             if (response) {
    //                 const data = await response.json();
    //                 setAccessToken(data.access);
    //                 localStorage.setItem('accessToken', data.access);
    //                 console.log(accessToken)
    //             } else {
    //                 // console.error('Refresh token failed:', response.statusText);
    //                 // // Обработка ошибки, например, перенаправление на страницу логина
    //                 // window.location.href = '/login';
    //             }
    //         } catch (error) {
    //             console.error('Refresh token failed:', error);
    //             // window.location.href = '/login';
    //         }
    //     };
    //
    //     const checkToken = () => {
    //         if (!accessToken) {
    //             refreshAccessToken();
    //         } else {
    //             const tokenExp = JSON.parse(atob(accessToken.split('.')[1])).exp;
    //             const isExpired = tokenExp * 1000 < new Date().getTime();
    //             if (isExpired) {
    //                 refreshAccessToken();
    //             }
    //         }
    //     };
    //
    //     checkToken();
    //
    //     // Установка таймера для автоматического обновления токена каждые 29 минут
    //     const intervalId = setInterval(() => {
    //         refreshAccessToken();
    //     }, 29 * 60 * 1000);
    //
    //     // Очистка таймера при размонтировании компонента
    //     return () => clearInterval(intervalId);
    // }, [accessToken]);

    return { accessToken };
}
