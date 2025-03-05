import { createGenericStore, type GenericItem } from './generic/useGenericStore';

interface Book extends GenericItem {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

export const useBookStore = createGenericStore<Book>('books');
