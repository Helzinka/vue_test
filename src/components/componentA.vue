<template>
  <div class="step-form">
    <h3>Step 1: Personal Information</h3>
    <div class="form-group">
      <label>First Name:</label>
      <input
        v-model="personal.firstName"
        type="text"
        @blur="validateField('firstName')"
        :class="{ error: errors.firstName }"
      />
      <span class="error-message" v-if="errors.firstName">{{ errors.firstName }}</span>
    </div>
    <div class="form-group">
      <label>Last Name:</label>
      <input
        v-model="personal.lastName"
        type="text"
        @blur="validateField('lastName')"
        :class="{ error: errors.lastName }"
      />
      <span class="error-message" v-if="errors.lastName">{{ errors.lastName }}</span>
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input
        v-model="personal.email"
        type="email"
        @blur="validateField('email')"
        :class="{ error: errors.email }"
      />
      <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
    </div>
    <div class="validation-status" v-if="isValid">✅ All fields are valid</div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '../types/FormData';
import { ref, computed } from 'vue';

const personal = defineModel<FormData>('personal');

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const errors = ref<Errors>({});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field: keyof Pick<FormData, 'firstName' | 'lastName' | 'email'>) => {
  errors.value[field] = '';

  switch (field) {
    case 'firstName':
      if (!personal.value?.firstName) {
        errors.value.firstName = 'First name is required';
      } else if (personal.value.firstName.length < 2) {
        errors.value.firstName = 'First name must be at least 2 characters';
      }
      break;

    case 'lastName':
      if (!personal.value?.lastName) {
        errors.value.lastName = 'Last name is required';
      } else if (personal.value.lastName.length < 2) {
        errors.value.lastName = 'Last name must be at least 2 characters';
      }
      break;

    case 'email':
      if (!personal.value?.email) {
        errors.value.email = 'Email is required';
      } else if (!emailRegex.test(personal.value.email)) {
        errors.value.email = 'Please enter a valid email address';
      }
      break;
  }
};

const validateAll = () => {
  validateField('firstName');
  validateField('lastName');
  validateField('email');
};

const isValid = computed(() => {
  if (!personal.value) return false;
  return (
    personal.value.firstName?.length >= 2 &&
    personal.value.lastName?.length >= 2 &&
    emailRegex.test(personal.value.email || '') &&
    Object.keys(errors.value).length === 0
  );
});

defineExpose({
  validateAll,
  isValid
});
</script>

<style scoped>
.step-form {
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.error {
  border-color: red;
  background-color: #fff8f8;
}
.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
  display: block;
}
.validation-status {
  margin-top: 15px;
  color: green;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition:
    border-color 0.3s,
    background-color 0.3s;
}
input:focus {
  outline: none;
  border-color: #4caf50;
}
</style>
