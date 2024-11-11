import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card, CardContent } from '~/components/ui/card';
import { emotionColors, emotionIcons } from '~/utils/emotion-styles';
import type { Diary } from '~/types/diary';
import { Button } from '~/components/ui/button';

// 임시 데이터 (나중에 DB 연동)
const DUMMY_DIARIES: Diary[] = [
  {
    id: '1',
    title: 'Today was amazing',
    content: 'Had a great day...',
    createdAt: new Date(),
    emotion: 'Happy',
  },
  {
    id: '2',
    title: 'Feeling blue',
    content: 'Not the best day...',
    createdAt: new Date(),
    emotion: 'Sad',
  },
];

export const loader: LoaderFunction = async () => {
  return json({ diaries: DUMMY_DIARIES });
};

export default function DiaryListPage() {
  const { diaries } = useLoaderData<typeof loader>();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>My Diary</h1>
      <div className='flex justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Diary List</h2>
        <Button>Add Diary</Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {diaries.map((diary: Diary) => {
          const EmotionIcon = emotionIcons[diary.emotion];

          return (
            <Card
              key={diary.id}
              className='cursor-pointer hover:shadow-lg transition-shadow'
              style={{ backgroundColor: `${emotionColors[diary.emotion]}20` }}
            >
              <CardContent className='p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <h2 className='text-xl font-semibold'>{diary.title}</h2>
                  <EmotionIcon className='w-6 h-6' />
                </div>
                <p className='text-sm text-gray-600 mb-2'>
                  {new Date(diary.createdAt).toLocaleDateString()}
                </p>
                <p className='text-gray-700 line-clamp-3'>{diary.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
