<template>
  <GenericList :store="bookStore">
    <!-- Slot pour les contrôles -->
    <template #controls>
      <div class="book-controls">
        <input v-model="newBook.title" placeholder="Book title" />
        <input v-model="newBook.author" placeholder="Author name" />
        <button @click="addBook" :disabled="!isValidBook">Add Book</button>
      </div>
    </template>

    <!-- Slot pour chaque élément -->
    <template #item="{ item: book, onDelete, onUpdate }">
      <div class="book-item">
        <div class="book-info">
          <strong>{{ book.title }}</strong>
          by {{ book.author }}
        </div>
        <div class="book-actions">
          <button @click="onUpdate(book.id, { available: !book.available })">
            {{ book.available ? 'Mark Unavailable' : 'Mark Available' }}
          </button>
          <button @click="onDelete(book.id)" class="delete">Delete</button>
        </div>
      </div>
    </template>
  </GenericList>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import GenericList from './GenericList.vue';
import { useBookStore } from '../stores/bookStore';

const bookStore = useBookStore();

const newBook = ref({
  title: '',
  author: ''
});

const isValidBook = computed(
  () => newBook.value.title.length > 0 && newBook.value.author.length > 0
);

const addBook = async () => {
  if (!isValidBook.value) return;

  await bookStore.addItem({
    id: Date.now().toString(),
    title: newBook.value.title,
    author: newBook.value.author,
    available: true
  });

  newBook.value.title = '';
  newBook.value.author = '';
};
</script>

<style scoped>
.book-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.book-actions {
  display: flex;
  gap: 8px;
}

.delete {
  color: red;
}
</style>
