import { createGenericStore, GenericItem } from './generic/useGenericStore';

interface Task extends GenericItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export const useTaskStore = createGenericStore<Task>('tasks');
