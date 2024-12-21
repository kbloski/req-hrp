<script setup>
import { usePost } from '@/hooks/usePost';
import ExperiencesList from './ExperiencesList.vue';

const submitFetch = usePost('https://url-api/register');

const props = defineProps({
    name: String,
    surname: String,
    birthday: String, 
    phone: Number,
    email: String,
    experiences: Array,
});


function sendData(){
    submitFetch.postData( props )
}

</script>

<template>
    <v-container>
        <v-alert
            v-if="submitFetch.isOk.value === true"
            closable
            title="Success"
            text="Your data sent successfully."
            type="success"
        ></v-alert>    
        <v-alert
            v-if="submitFetch.isOk.value === false"
            closable
            title="Error"
            text='Error sending your data. Try again.'
            type="error"
        ></v-alert>    



        <div class="text-subtitle-1 font-weight-black">Summary</div>
        <div>
            <div>Name: {{ name }} </div>
            <div>Surname: {{ surname }} </div>
            <div>Brithday: {{ birthday }}</div>
            <div>Phone: {{ phone }}</div>
            <div>Email: {{ email }}</div>
        </div>
        <experiences-list :experiences="experiences" :height="100"></experiences-list>
        <v-btn color="success mt-4" @click="sendData" :loading="submitFetch.loading.value">Prześlij dane</v-btn>
    </v-container>
</template>

