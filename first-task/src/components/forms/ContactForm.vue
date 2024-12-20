<script setup>
import { ref, reactive, watch, computed } from 'vue';

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
    if (!phone) validationErrors.phone = 'This field is required'

    else validationErrors.phone = null

    if (!email) validationErrors.email = 'This field is required'
    else validationErrors.email = null
}, { immediate: true})


function onSubmit( event ){
    event.preventDefault()

    emits( 'submit-form', {
        isValidate: isValidate.value,
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
            >Go next step</v-btn>
        </v-form>
    </v-container>
</template>