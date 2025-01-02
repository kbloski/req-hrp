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

        <div v-show="steps.current == 1">
            <keep-alive>
                <personal-form @submit-form="endStep1"></personal-form>
            </keep-alive>
        </div>
        <div v-show="steps.current == 2">
            <keep-alive>
                <contact-form @submit-form="endStep2"></contact-form>
            </keep-alive>
        </div>
        <div v-show="steps.current == 3">
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
                :experiences="registerStore.experiences"
            ></experiences-list>
        </div>
        <div v-if="steps.current === steps.total">
          <Summary></Summary>
        </div>
    </v-card>
</template>


<script setup>
import ExperiencesList from "@/components/ExperiencesList.vue";
import ContactForm from "@/components/forms/ContactForm.vue";
import ExperienceForm from "@/components/forms/ExperienceForm.vue";
import PersonalForm from "@/components/forms/PersonalForm.vue";
import { useRegisterStore } from "@/store/register";
import { reactive } from "vue";

const registerStore = useRegisterStore()

const steps = reactive({
    current: 1,
    total: 4,
});

function backStep() {
    if (steps.current > 1) steps.current--;
}

function endStep1(formData) {
    if (!formData.isValid) return;

    const data = formData.formData;

    registerStore.name = data.name;
    registerStore.surname = data.surname;
    registerStore.birthday = data.birthday;

    console.log( registerStore.birthday )

    steps.current = 2;
}

function endStep2(formData) {
    if (!formData.isValid) return;

    const data = formData.formData;

    registerStore.phone = data.phone;
    registerStore.email = data.email;

    steps.current = 3;
}

function summary() {
    steps.current = steps.total;
}

function submitExperienceForm(form) {
    if (!form.isValid) return;

    const experienceData = form.formData;
    registerStore.experiences.push( experienceData );
}
</script>
