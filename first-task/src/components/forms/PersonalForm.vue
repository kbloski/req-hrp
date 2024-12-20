<template>
    <v-container>
        <v-form>
            <v-text-field
                v-model="name"
                label="First name"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="surname"
                label="Last name"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="dateBrith"
                color="primary"
                type="date"
            ></v-text-field>
        </v-form>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
const name = ref(null)
const surname = ref(null)
const dateBrith = ref(null)


</script>