<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field } from '@/plugins/vee-validate';
import type AccountUserPayload from '@/types/account/account-user-payload.type';
import type AccountUser from '@/types/account/account-user.type';
import { useAccountUserStore } from '@/stores/account-user';
import { useSnackbarStore } from '@/stores/snackbar.store';
import { RoleType } from '@/types/user/user-role.type';

const accountUserStore = useAccountUserStore();
const snackbarStore = useSnackbarStore();

defineProps<{
  modelValue: boolean,
  selectedAccountUser?: AccountUser | null
}>();

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const userTypes = [ RoleType.ASSISTANT, RoleType.HEALTHCARE_PROFESSIONAL ];

async function onSubmit(formValues: Record<string, any>) {
  const accountUser: AccountUserPayload = formValues as AccountUserPayload;

  try {
    await accountUserStore.saveAccountUser(accountUser);
    snackbarStore.show('Registro realizado com sucesso! Bem-vindo(a)!', 'success');
  } catch (err: any) {
    console.error('Erro no registro:', err);
    snackbarStore.show(accountUserStore.error || 'Falha ao salvar usuário.', 'error');
  }
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="500px">
    <Form @submit="onSubmit" :initial-values="selectedAccountUser || undefined">
      <v-card>
        <v-card-title>
          {{ !!selectedAccountUser ? 'Editar usuário' : 'Novo usuário' }}
        </v-card-title>
        <v-card-text>
          <Field
            name="name"
            rules="required|min:3|alpha_spaces"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="Nome"
              prepend-inner-icon="mdi-account"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              class="mb-3"
            />
          </Field>

          <Field
            name="email"
            rules="required|email"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="E-mail"
              prepend-inner-icon="mdi-email"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              class="mb-3"
            />
          </Field>

          <Field
            name="cellphone"
            rules="required|min:15|max:16"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="Telefone"
              v-mask="['(##) #####-####', '(##) ####-####']"
              prepend-inner-icon="mdi-phone"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              class="mb-3"
            />
          </Field>

          <Field
            name="cpf"
            rules="required|cpf"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="CPF"
              v-mask="'###.###.###-##'"
              prepend-inner-icon="mdi-card-account-details"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              class="mb-3"
            />
          </Field>

          <Field
            name="password"
            rules="required|min:6"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              class="mb-1"
            />
          </Field>
          <div class="text-caption text-red mb-3">Nível de segurança da senha: <strong>Baixo</strong></div>

          <Field
            name="confirmPassword"
            rules="required|confirmed:@password"
            v-slot="{ field, errorMessage }"
          >
            <v-text-field
              v-bind="field"
              label="Confirmar senha"
              :type="showConfirmPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              class="mb-3"
            />
          </Field>
          <Field
            name="role"
            rules="required"
            v-slot="{ field, errorMessage }"
          >
            <v-select
              v-bind="field"
              label="Tipo"
              :items="userTypes"
              required
              variant="solo-filled"
              density="compact"
              :error="!!errorMessage"
              :error-messages="errorMessage"
            />
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
