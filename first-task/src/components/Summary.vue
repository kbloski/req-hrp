<script setup>
import { usePost } from '@/hooks/usePost';
import ExperiencesList from './ExperiencesList.vue';
import { useRegisterStore } from '@/store/register';

const submitFetch = usePost('https://url-api/register');
const registerStore = useRegisterStore()


function sendData(){
    submitFetch.postData( {
        name: registerStore.name,
        surname: registerStore.surname,
        birthday: registerStore.birthday,
        phone: registerStore.phone,
        email: registerStore.email,
        experiences: registerStore.experiences
    } )
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
            <div>Name: {{ registerStore.name }} </div>
            <div>Surname: {{ registerStore.surname }} </div>
            <div>Brithday: {{ registerStore.birthday }}</div>
            <div>Phone: {{ registerStore.phone }}</div>
            <div>Email: {{ registerStore.email }}</div>
        </div>
        <experiences-list :experiences="registerStore.experiences" :height="100"></experiences-list>
        <v-btn color="success mt-4" @click="sendData" :loading="submitFetch.loading.value">Prześlij dane</v-btn>
    </v-container>
</template>

