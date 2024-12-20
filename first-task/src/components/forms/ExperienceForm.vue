<script setup>
import { ref, reactive, watch, computed } from "vue";
import { errorMessages } from "vue/compiler-sfc";

const emits = defineEmits(["submit-form"]);

const company = ref(null);
const position = ref(null);
const startDate = ref(null);
const endDate = ref(null);

// Errors
const validationErrors = reactive({
    position: null,
    company: null,
    startDate: null,
    endDate: null,
});
const isValidate = computed(
    () =>
        !validationErrors.position &&
        !validationErrors.company &&
        !startDate.company &&
        !endDate.company
);

watch(
    [ company, position, startDate, endDate],
    ([ company, position, startDate, endDate]) => {
       if (!position) validationErrors.position = "This field is required";
        else validationErrors.position = null;

        if (!company) validationErrors.company = "This field is required";
        else validationErrors.company = null;

        if (!startDate) validationErrors.startDate = "This field is required";
        else validationErrors.startDate = null;

        if (!endDate) validationErrors.endDate = "This field is required";
        else validationErrors.endDate = null;
    },
    { immediate: true }
);

function onSubmit(event) {
    event.preventDefault();

    emits("submit-form", {
        isValidate: isValidate.value,
        formData: {
            position: position.value,
            company: company.value,
        },
    });
}
</script>

<template>
    <v-container>
        <v-form @submit="onSubmit">
            <v-text-field 
                label="Company"
                v-model="company"
                variant="underlined"
                :rules="[() => validationErrors.company ?? true]"
                required
            ></v-text-field>
            <v-text-field 
                label="Position" 
                v-model="position"
                variant="underlined"
                :rules="[validationErrors.position ?? true]"
                required
            ></v-text-field>
            <v-text-field 
                label="Start date" 
                v-model="startDate"
                type="date"
                :rules="[validationErrors.startDate ?? true]"
                required
            ></v-text-field>
            <v-text-field 
                label="End date"
                v-model="endDate" 
                type="date"
                :rules="[validationErrors.endDate ?? true]"
                required
            ></v-text-field>
            <v-btn type="submit" color="success" class="mt-3">Submit</v-btn>
        </v-form>
    </v-container>
</template>
