<template>
  <div class="step-form">
    <h3>Step 3: Preferences</h3>
    <div class="form-group">
      <label>
        <input v-model="form.newsletter" type="checkbox" />
        Subscribe to newsletter
      </label>
    </div>
    <div class="form-group">
      <label>Interests:</label>
      <select v-model="form.interests" multiple>
        <option value="sports">Sports</option>
        <option value="music">Music</option>
        <option value="tech">Technology</option>
        <option value="travel">Travel</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '../types/FormData';

const form = defineModel<FormData>('form');
</script>
<style></style>
