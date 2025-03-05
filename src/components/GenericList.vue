<template>
  <div class="generic-list">
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">Error: {{ store.error }}</div>
    <div v-else>
      <slot name="controls" />

      <ul class="items-list">
        <li v-for="item in store.getAllItems" :key="item.id" class="list-item">
          <slot name="item" :item="item" :onDelete="deleteItem" :onUpdate="updateItem" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GenericItem } from '../stores/generic/useGenericStore';

const props = defineProps<{
  store: any; // Le store qui suit notre pattern générique
}>();

const deleteItem = async (id: string | number) => {
  await props.store.deleteItem(id);
};

const updateItem = async (id: string | number, updates: Partial<GenericItem>) => {
  await props.store.updateItem(id, updates);
};
</script>

<style scoped>
.generic-list {
  width: 100%;
  padding: 1rem;
}

.items-list {
  list-style: none;
  padding: 0;
}

.list-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
