export interface Diary {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  emotion: 'Happy' | 'Sad' | 'Angry' | 'Normal' | 'Surprise';
}
