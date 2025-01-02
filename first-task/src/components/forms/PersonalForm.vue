<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { getCurrentDateFormYearMontDay } from '@/utils/dateUtils';

const emits = defineEmits(['submit-form'])

const name = ref(null)
const surname = ref(null)
const birthday = ref(null)

// Errors
const validationErrors = reactive({
    name: null,
    surname: null,
    birthday: null
})

const isValidate = computed( 
    () => 
    !validationErrors.name 
    && !validationErrors.surname 
    && !validationErrors.birthday
)

watch([name, surname, birthday], ([name, surname, birthday]) => {
    validationErrors.name = null
    validationErrors.surname = null
    validationErrors.birthday = null

    if (!name) validationErrors.name = 'This field is required'

    if (!surname) validationErrors.surname = 'This field is required'
    
    if (!birthday) validationErrors.birthday = 'This field is required'
}, { immediate: true})


function onSubmit( event ){
    event.preventDefault()

    emits( 'submit-form', {
        isValid: isValidate.value,
        formData: {
            name: name.value,
            surname: surname.value,
            birthday: birthday.value
        }
    })
}
</script>

<template>
    <v-container>
        <div class="text-subtitle-1 font-weight-black">Personal</div>
        <v-form @submit="onSubmit">
            <v-text-field
                v-model="name"
                label="First name"
                variant="underlined"
                :rules="[() => validationErrors.name ?? true]"
                required
            ></v-text-field>
            <v-text-field
                v-model="surname"
                label="Last name"
                variant="underlined"
                :rules="[() => validationErrors.surname ?? true]"
                required
            ></v-text-field>
            <v-text-field
                v-model="birthday"
                label="Brithday"
                color="primary"
                type="date"
                :max="getCurrentDateFormYearMontDay()"
                :rules="[() => validationErrors.birthday ?? true]"
                required
            ></v-text-field>
            <v-btn 
                type="submit" 
                color="success"
                class="mt-3"
            >Submit</v-btn>
        </v-form>

    </v-container>
</template>