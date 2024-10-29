'use client'

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Container } from '@/components/shared';

export default function Home() {
  const [collectionName, setCollectionName] = useState('');
  const [collectionAmount, setCollectionAmount] = useState('');
  const [mockLink, setMockLink] = useState('');

  const handleCreateCollection = async () => {
    // Моковый запрос на сервер
    const response: string = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://mocklink/' + collectionName);
      }, 1000);
    });

    setMockLink(response);
  };

  return (
      <Container>
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Создание сбора</h1>

            <div className="mb-4">
              <input
                  type="text"
                  placeholder="Название сбора"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="border rounded p-2 w-full mb-2"
              />
              <input
                  type="number"
                  placeholder="Сумма сбора"
                  value={collectionAmount}
                  onChange={(e) => setCollectionAmount(e.target.value)}
                  className="border rounded p-2 w-full mb-2"
              />
            </div>

            <Button onClick={handleCreateCollection} className="bg-blue-500 text-white rounded p-2">
              Создать
            </Button>

            {mockLink && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Ссылка на сбор:</h3>
                  <a href={mockLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{mockLink}</a>
                </div>
            )}
          </div>
      </Container>
  );
}
