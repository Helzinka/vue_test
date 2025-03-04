import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface GenericItem {
  id: string | number;
  [key: string]: any;
}

export interface GenericState<T extends GenericItem> {
  items: T[];
  loading: boolean;
  error: string | null;
}

export function createGenericStore<T extends GenericItem>(storeName: string) {
  return defineStore(storeName, () => {
    const items = ref<T[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const getItemById = computed(() => {
      return (id: string | number) => items.value.find(item => item.id === id);
    });

    const getAllItems = computed(() => items.value);

    // Actions
    const addItem = async (item: T) => {
      try {
        loading.value = true;
        error.value = null;
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 500));
        items.value.push(item);
        return item;
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unknown error occurred';
        throw e;
      } finally {
        loading.value = false;
      }
    };

    const updateItem = async (id: string | number, updates: Partial<T>) => {
      try {
        loading.value = true;
        error.value = null;
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = items.value.findIndex(item => item.id === id);
        if (index !== -1) {
          items.value[index] = { ...items.value[index], ...updates };
          return items.value[index];
        }
        throw new Error('Item not found');
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unknown error occurred';
        throw e;
      } finally {
        loading.value = false;
      }
    };

    const deleteItem = async (id: string | number) => {
      try {
        loading.value = true;
        error.value = null;
        await new Promise(resolve => setTimeout(resolve, 500));
        items.value = items.value.filter(item => item.id !== id);
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unknown error occurred';
        throw e;
      } finally {
        loading.value = false;
      }
    };

    return {
      // State
      items,
      loading,
      error,
      // Getters
      getItemById,
      getAllItems,
      // Actions
      addItem,
      updateItem,
      deleteItem
    };
  });
}
