<script setup lang="ts">
import { reactive, watch } from 'vue';
import { Form, Field } from '@/plugins/vee-validate';
import { useServiceStore } from '@/stores/service.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import type Service from '@/types/service/service.type';
import type ServicePayload from '@/types/service/service-payload.type';
import { useSystemModuleStore } from '@/stores/system-module.store';

const serviceStore = useServiceStore();
const snackbarStore = useSnackbarStore();
const systemModuleStore = useSystemModuleStore()

const props = defineProps<{
  modelValue: boolean,
  selectedService?: Service | null
}>();

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)

let service = reactive<ServicePayload>({
  uuid: props.selectedService?.uuid || undefined,
  name: props.selectedService?.name || '',
  description: props.selectedService?.description || '',
  price: props.selectedService?.price || '',
  systemModule: props.selectedService?.systemModule || systemModuleStore.system_modules![0]
})

watch(() => props.selectedService, (val) => {
  service = {
    name: props.selectedService?.name || '',
    description: props.selectedService?.description || '',
    price: props.selectedService?.price || '',
    systemModule: props.selectedService?.systemModule || systemModuleStore.system_modules![0]
  }
})

async function onSubmit(formValues: Record<string, any>) {
  const service: ServicePayload = formValues as ServicePayload;
  const systemModuleName = props.selectedService?.systemModule.name || systemModuleStore.system_modules!.find(x => x.uuid === service.uuid) // PENSAR MELHOR

  try {
    await serviceStore.saveService(service, props.selectedService?.uuid);
    snackbarStore.show('Registro realizado com sucesso! Bem-vindo(a)!', 'success');
    close();
  } catch (err: any) {
    console.error('Erro no registro:', err);
    snackbarStore.show(serviceStore.error || 'Falha ao salvar usuário.', 'error');
  }
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="500px">
    <Form @submit="onSubmit" :initial-values="service">
      <v-card>
        <v-card-title class="text-h6">
          {{ !!selectedService ? 'Editar Serviço' : 'Novo Serviço' }}
        </v-card-title>
        <v-card-text>
          <Field name="name" rules="required" v-slot="{ field, errorMessage }">
            <v-text-field
              v-bind="field"
              label="Nome"
              variant="solo-filled"
              density="compact"
              :persistent-placeholder="!!props.selectedService?.name"
              :error="!!errorMessage"
              :error-messages="errorMessage" class="mb-3"
            />
          </Field>
          <Field name="name" rules="required" v-slot="{ field, errorMessage }">
            <v-textarea
              v-bind="field"
              label="Descrição"
              variant="solo-filled"
              density="compact"
              :persistent-placeholder="!!props.selectedService?.description"
              :error="!!errorMessage"
              :error-messages="errorMessage" class="mb-3"
            />
          </Field>
          <Field name="name" rules="required|min:0" v-slot="{ field, errorMessage }">
            <v-text-field
              v-bind="field"
              label="Valor (R$)"
              prefix="R$"
              type="number"
              min="0"
              step="0.01"
              variant="solo-filled"
              density="compact"
              :persistent-placeholder="!!props.selectedService?.price"
              :error="!!errorMessage"
              :error-messages="errorMessage" class="mb-3"
            />
          </Field>
          <Field name="systemModule" rules="required" v-slot="{ field, errorMessage }">
            <v-select
              v-bind="field"
              label="Módulo do Sistema"
              :items="systemModuleStore.systemModulesOptions"
              item-value="value"
              item-title="title"
              item-props="disabled"
              :return-object="false"
              variant="solo-filled"
              density="compact"
              persistent-placeholder
              :error="!!errorMessage"
              :error-messages="errorMessage"
            >
              <template v-slot:item="{ item, props: itemProps }">
                <v-list-item v-bind="itemProps" :title="item.title" :disabled="item.raw.disabled" />
              </template>
            </v-select>
          </Field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">Cancelar</v-btn>
          <v-btn color="primary" type="submit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </Form>
  </v-dialog>
</template>