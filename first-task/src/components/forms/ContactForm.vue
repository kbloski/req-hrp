<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { validPhone, zodValidations } from '@/validation';

const emits = defineEmits(['submit-form'])

const phone = ref(null)
const email = ref(null)

// Errors
const validationErrors = reactive({
    phone: null,
    email: null,
})
const isValidate = computed( 
    () => 
    !validationErrors.phone 
    && !validationErrors.email 
)

watch([phone, email], ([phone, email]) => {
    validationErrors.phone = null
    validationErrors.email = null

    if (!phone) validationErrors.phone = 'This field is required'
    else {
        validationErrors.phone = validPhone( phone )
    }

    if (!email) validationErrors.email = 'This field is required'
    else {
        try {
            zodValidations.validEmail.parse( email )
        } catch (err){
            validationErrors.email = err.issues[0].message
        }
    } 
}, { immediate: true})


function onSubmit( event ){
    event.preventDefault()

    emits( 'submit-form', {
        isValid: isValidate.value,
        formData: {
            phone: phone.value,
            email: email.value
        }
    })
}
</script>

<template>
    <v-container>
        <div class="text-subtitle-1 font-weight-black">Contact</div>
        <v-form @submit="onSubmit">
            <v-text-field
                v-model="phone"
                label="Phone"
                type="number"
                :rules="[() => validationErrors.phone ?? true]"
                required
            ></v-text-field>
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[() => validationErrors.email ?? true]"
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