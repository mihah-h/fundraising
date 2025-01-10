export const getGroups = async (token) => {
    const url = 'https://assembly.lamart.site/api/cash-collections/groups/'; // Замените на ваш реальный URL API

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    return data;
};
