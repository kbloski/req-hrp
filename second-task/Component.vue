<template>
    <q-select
        v-model="currentTheme"
        :options="themes"
        :dense="props.dense"
        emit-value
        map-options
        @update:model-value="updateTheme"
    >
        <template #selected-item="scope">
            <font-awesome-icon :icon="scope.opt.icon" />
        </template>
        <template #option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section side>
                    <font-awesome-icon :icon="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        {{ scope.opt.label }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { alertType } from 'src/enums/alert';
import { theme } from 'src/enums/theme'; 
import { showAlert } from 'src/hooks/showAlert';
import { usePageTheme } from 'src/hooks/usePageTheme';
import { useStorage } from 'src/hooks/useStorage';
import { inject, ref } from 'vue';

interface Props {
    value: string,
    dense: boolean
}

interface Emits {
    (event: 'selected', arg: string) : void
}

interface Theme {
    label: string,
    value: theme,
    icon: string
}

const emit = defineEmits<Emits>(['selected']);
const props = defineProps<Props>(['value', 'dense']);

const api = inject('api');
const trans = inject('trans');

const storage = useStorage();
const pageTheme = usePageTheme();
const currentTheme = ref<string>(props.value || pageTheme.get());

const themes : Theme[] = [
    { label: 'Motyw jasny', value: theme.LIGHT, icon: 'fa-regular fa-sun' },
    { label: 'Motyw ciemny', value: theme.DARK, icon: 'fa-regular fa-moon' },
    { label: 'Motyw dostępności (WCAG 2.1 AA)', value: theme.WCAG, icon: 'fa-regular fa-circle-half-stroke' },
];

const updateTheme = (value : theme ) => {
    pageTheme.set(value);

    api.post('/user-settings', { theme: value }).then((response) => {
        showAlert(alertType.SUCCESS, trans('Poprawnie zapisano ustawienia'));

        if (response.data && response.data.success && response.data.data) {
            storage.setItem('theme', response.data.data.theme); // string - ls przyjmuje tylko stringi do zapisu 
            emit('selected', response.data.data.theme);
        }
    });
};
</script>
