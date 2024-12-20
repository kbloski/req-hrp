<script setup>
import ContactForm from '@/components/forms/ContactForm.vue';
import ExperienceForm from '@/components/forms/ExperienceForm.vue';
import PersonalForm from '@/components/forms/PersonalForm.vue';
import { reactive } from 'vue';

const steps = reactive({
  current: 3,
  total: 3
});

function changeStep( formData ){
    if (formData.isValidate) steps.current++;
}

const backStep = () => {
  if (steps.current <= 1) return;
  steps.current --
}

</script>



<template>
  <v-card 
    class="mx-auto"
    width="344"
    title="Register"
    :subtitle="`Step ${steps.current}/${steps.total}`" 
  >
    <v-divider></v-divider>
    <v-btn v-if="steps.current >= 2" @click="backStep">Go Back</v-btn>

    <personal-form 
      v-if="steps.current == 1" 
      @submit-form="changeStep"
    ></personal-form>
    <contact-form v-if="steps.current == 2" @submit-form="changeStep"></contact-form>
    <experience-form v-if="steps.current == 3"></experience-form>
  </v-card>
</template>


