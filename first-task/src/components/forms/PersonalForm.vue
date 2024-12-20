<script setup>
import { ref, reactive, watch, computed } from 'vue';

const emits = defineEmits(['submit-form'])

const name = ref(null)
const surname = ref(null)
const dateBrith = ref(null)

// Errors
const validationErrors = reactive({
    name: null,
    surname: null,
    dateBrith: null
})
const isValidate = computed( 
    () => 
    !validationErrors.name 
    && !validationErrors.surname 
    && !validationErrors.dateBrith
)

watch([name, surname, dateBrith], ([name, surname, dateBrith]) => {
    if (!name) validationErrors.name = 'This field is required'
    else validationErrors.name = null

    if (!surname) validationErrors.surname = 'This field is required'
    else validationErrors.surname = null
    
    if (!dateBrith) validationErrors.dateBrith = 'This field is required'
    // TODO check is back date from today
    else validationErrors.dateBrith = null
}, { immediate: true})


function onSubmit( event ){
    event.preventDefault()

    emits( 'submit-form', {
        isValidate: isValidate.value,
        formData: {
            name: name.value,
            surname: surname.value,
            dateBrith: dateBrith.value
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
                v-model="dateBrith"
                color="primary"
                type="date"
                :rules="[() => validationErrors.dateBrith ?? true]"
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