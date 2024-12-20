<template>
  <v-card 
    class="mx-auto"
    width="344"
    title="Register"
    :subtitle="`Step ${steps.current}/${steps.total}`" 
  >
    <v-divider></v-divider>
    <personal-form v-if="steps.current == 1" @submit-form="changeStep"></personal-form>
    <contact-form v-if="steps.current == 2"></contact-form>
    <experience-form v-if="steps.current == 3"></experience-form>
  </v-card>
</template>

<script setup>
import ContactForm from '@/components/forms/ContactForm.vue';
import ExperienceForm from '@/components/forms/ExperienceForm.vue';
import PersonalForm from '@/components/forms/PersonalForm.vue';
import { reactive } from 'vue';

const steps = reactive({
  current: 1,
  total: 3
});

function changeStep( formData ){
    if (formData.isValidate) steps.current++;
}

</script>
