<script setup>
import ExperiencesList from "@/components/ExperiencesList.vue";
import ContactForm from "@/components/forms/ContactForm.vue";
import ExperienceForm from "@/components/forms/ExperienceForm.vue";
import PersonalForm from "@/components/forms/PersonalForm.vue";
import { reactive } from "vue";

const summaryData = reactive({
    name: null,
    surname: null,
    birthday: null,
    phone: null,
    email: null,
    experiences: [],
});

const steps = reactive({
    current: 3,
    total: 4,
});

function backStep() {
    if (steps.current > 1) steps.current--;
}

function endStep1(formData) {
    if (!formData.isValid) return;

    const data = formData.formData;

    summaryData.name = data.name;
    summaryData.surname = data.surname;
    summaryData.birthday = data.dateBrith;

    steps.current = 2;
}

function endStep2(formData) {
    if (!formData.isValid) return;

    const data = formData.formData;

    summaryData.phone = data.phone;
    summaryData.email = data.email;

    steps.current = 3;
}

function summary() {
    steps.current = steps.total;
}

function submitExperienceForm(form) {
    if (!form.isValid) return;

    const experienceData = form.formData;
    summaryData.experiences.push(experienceData);
}
</script>

<template>
    <v-card
        class="mx-auto"
        max-width="1000"
        min-width="300"
        title="Register"
        :subtitle="`Step ${steps.current}/${steps.total}`"
    >
        <v-btn
            v-if="steps.current >= 2 && steps.current"
            @click="backStep"
            class="ms-4 mb-2"
            density="compact"
            color="error"
            >Back</v-btn
        >
        <v-divider></v-divider>

        <div v-if="steps.current == 1">
            <keep-alive>
                <personal-form @submit-form="endStep1"></personal-form>
            </keep-alive>
        </div>
        <div v-if="steps.current == 2">
            <keep-alive>
                <contact-form @submit-form="endStep2"></contact-form>
            </keep-alive>
        </div>
        <div v-if="steps.current == 3">
            <keep-alive>
                <experience-form @submit-form="submitExperienceForm"></experience-form>
            </keep-alive>
            <v-btn 
              color="warning" 
              class="ms-4 mb-2" 
              @click="summary"
            >Go to summary</v-btn>
            <v-divider></v-divider>
            <experiences-list
                v-if="summaryData.experiences.length"
                :experiences="summaryData.experiences"
            ></experiences-list>
        </div>
        <div v-if="steps.current === steps.total">
          <Summary 
              v-bind="summaryData"
          ></Summary>
        </div>
    </v-card>
</template>
