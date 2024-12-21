<script setup>
import { ref, reactive, watch, computed } from "vue";
import { isNumber } from "@/validation";
import { getCurrentDateFormYearMontDay } from "@/utils/dateUtils";

const emits = defineEmits(["submit-form"]);

const company = ref(null);
const position = ref(null);
const startDate = ref(null);
const endDate = ref(null);

function resetFormData(){
    company.value = null;
    position.value = null;
    startDate.value = null;
    endDate.value = null;
}

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

function isDateAfter( firstDate, secondDate){
    let dateBefore = firstDate
    let dateAfter = secondDate

    if (!(dateBefore instanceof Date)) dateBefore = new Date(firstDate)
    if (!(dateAfter instanceof Date)) dateAfter = new Date(secondDate)

    // Check valid date type
    if ( !isNumber(dateBefore.getTime())) 
        throw new Error('Provide valid date in first argument.')
    if (!isNumber( dateAfter.getTime())) 
        throw new Error("Provide valid date in second argument.")

    return dateBefore.getTime() < dateAfter.getTime()
}

watch(
    [ company, position, startDate, endDate],
    ([ company, position, startDate, endDate]) => {
        validationErrors.position = null;
        validationErrors.company = null;
        validationErrors.startDate = null;
        validationErrors.endDate = null;

        if (!position) validationErrors.position = "This field is required";

        if (!company) validationErrors.company = "This field is required";
        
        if (!startDate) validationErrors.startDate = "This field is required";

        if (!endDate) validationErrors.endDate = "This field is required";

        if (startDate && endDate && !isDateAfter(startDate, endDate)) {
            validationErrors.startDate = 'Start date must be before end date.'
            validationErrors.endDate = 'End date must be after start date.'
        }


       
    },
    { immediate: true }
);

function onSubmit(event) {
    event.preventDefault();

    emits("submit-form", {
        isValid: isValidate.value,
        formData: {
            company: company.value,
            position: position.value,
            start: startDate.value,
            end: endDate.value,
        },
    });

    resetFormData()
}
</script>

<template>
    <v-container>
        <div class="text-subtitle-1 font-weight-black">Experiences</div>
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
                :max="getCurrentDateFormYearMontDay()"
                :rules="[validationErrors.startDate ?? true]"
                required
            ></v-text-field>
            <v-text-field 
                label="End date"
                v-model="endDate" 
                :max="getCurrentDateFormYearMontDay()"
                type="date"
                :rules="[validationErrors.endDate ?? true]"
                required
            ></v-text-field>
            <v-btn type="submit" color="success" class="mt-3">Submit</v-btn>
        </v-form>
    </v-container>
</template>
