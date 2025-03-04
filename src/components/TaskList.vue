<template>
  <div class="task-list">
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">Error: {{ store.error }}</div>
    <div v-else>
      <div class="task-controls">
        <input v-model="newTaskTitle" placeholder="New task title..." />
        <button @click="addNewTask" :disabled="!newTaskTitle">Add Task</button>
      </div>

      <ul class="tasks">
        <li v-for="task in store.getAllItems" :key="task.id" class="task-item">
          <input type="checkbox" :checked="task.completed" @change="toggleTask(task)" />
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <select v-model="task.priority" @change="updateTaskPriority(task)">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const store = useTaskStore();
const newTaskTitle = ref('');

const addNewTask = async () => {
  if (!newTaskTitle.value) return;

  await store.addItem({
    id: Date.now().toString(),
    title: newTaskTitle.value,
    completed: false,
    priority: 'medium'
  });

  newTaskTitle.value = '';
};

const toggleTask = async (task: any) => {
  await store.updateItem(task.id, {
    completed: !task.completed
  });
};

const updateTaskPriority = async (task: any) => {
  await store.updateItem(task.id, {
    priority: task.priority
  });
};

const deleteTask = async (id: string) => {
  await store.deleteItem(id);
};
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.task-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.tasks {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>
