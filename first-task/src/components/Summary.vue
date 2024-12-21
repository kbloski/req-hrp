<script setup>
import ExperiencesList from './ExperiencesList.vue';

const props = defineProps({
    name: String,
    surname: String,
    birthday: String, 
    phone: Number,
    email: String,
    experiences: Array,
});
</script>

<template>
    <v-container>
        <div class="text-subtitle-1 font-weight-black">Summary</div>
        <div>
            <div>Name: {{ name }} </div>
            <div>Surname: {{ surname }} </div>
            <div>Brithday: {{ birthday }}</div>
            <div>Phone: {{ phone }}</div>
            <div>Email: {{ email }}</div>
        </div>
        <experiences-list :experiences="experiences" :height="100"></experiences-list>
        <v-btn color="success mt-4 ">Prześlij dane</v-btn>
    </v-container>
</template>

