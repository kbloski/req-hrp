<script setup>
import { ref } from "vue";

const props = defineProps({
    experiences: {
        type: Array,
        required: true,
    },
    height: Number,
});
const tableHeight = ref(300);

if (props.height) tableHeight.value = props.height;
</script>

<template>
    <v-container>
        <div class="text-subtitle-1 font-weight-black">Experiences List</div>
        <v-data-table-virtual
            :items="props.experiences"
            :height="tableHeight"
        ></v-data-table-virtual>
    </v-container>
</template>
