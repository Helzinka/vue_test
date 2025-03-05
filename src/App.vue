<script setup lang="ts">
import { ref, reactive } from 'vue';
import ComponentA from './components/componentA.vue';
import ComponentB from './components/componentB.vue';
import ComponentC from './components/componentC.vue';
import TaskList from './components/TaskList.vue';

const currentStep = ref(1);
const isLoading = ref(false);

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  zipCode: '',
  newsletter: true,
  interests: []
});

const componentARef = ref();

const nextStep = async () => {
  if (currentStep.value === 1) {
    await componentARef.value?.validateAll();
    if (!componentARef.value?.isValid) {
      alert('Please fill all required fields correctly');
      return;
    }
  }
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitForm = async () => {
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData.value);
    alert('Form submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Submission failed!');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <TaskList></TaskList>
  <!-- <main>
    <div class="form-container">
      <div class="steps-indicator">Step {{ currentStep }} of 3</div>

      <Transition name="fade" mode="out-in">
        <ComponentA v-if="currentStep === 1" v-model:personal="formData" ref="componentARef" />
        <ComponentB v-else-if="currentStep === 2" v-model:adress="formData" />
        <ComponentC v-else v-model:form="formData" />
      </Transition>

      <div class="navigation">
        <button @click="prevStep" :disabled="currentStep === 1 || isLoading">Previous</button>

        <button v-if="currentStep < 3" @click="nextStep" :disabled="isLoading">Next</button>

        <button v-else @click="submitForm" :disabled="isLoading">
          {{ isLoading ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </div>
  </main> -->
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.steps-indicator {
  text-align: center;
  margin-bottom: 20px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
