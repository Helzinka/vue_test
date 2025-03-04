<template>
  <div class="step-form">
    <h3>Step 2: Address</h3>
    <div class="form-group">
      <label>Street:</label>
      <input v-model="store.formData.street" type="text" />
    </div>
    <div class="form-group">
      <label>City:</label>
      <input v-model="store.formData.city" type="text" />
    </div>
    <div class="form-group">
      <label>Zip Code:</label>
      <input v-model="store.formData.zipCode" type="text" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
