<script setup lang="ts">
import { reactive } from 'vue';
import { Form, Field } from '@/plugins/vee-validate'
import { useUserStore } from '@/stores/user.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import type { ProfileCompany } from '@/types/profile/profile-company.type';

const userStore = useUserStore();
const snackbarStore = useSnackbarStore();

const companyDefault = reactive({
  name: '',
  corporateName: '',
  cnpj: '',
  phone: '',
  email: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  city: '',
  state: ''
});

async function onSubmit(formValues: Record<string, any>) {
  const company: ProfileCompany = formValues as ProfileCompany;

  try {
    await userStore.saveUserCompany(company);
    snackbarStore.show('Usuário atualizado com sucesso!', 'success')
  } catch (err) {
    snackbarStore.show('Falha ao tentar atualizar usuário: '+err, 'error')
  }
}
</script>

<template>
  <Form @submit="onSubmit" :initial-values="companyDefault">
    <v-row>
      <v-col cols="12" md="4" class="pr-md-6">
        <h5 class="text-subtitle-1 font-weight-medium">Informações da Empresa</h5>
        <p class="text-body-2 text-medium-emphasis">
          Preencha os dados cadastrais da empresa.
        </p>
      </v-col>
  
      <v-col cols="12" md="8">
        <v-form>
          <v-row>
            <v-col cols="12" sm="12">
              <Field
                name="name"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Nome da empresa"
                  :persistent-placeholder="userStore.company.name"
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="12">
              <Field
                name="social_reason"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Razão Social"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="cnpj"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="CNPJ"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="cellphone"
                rules="required|min:15|max:16"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Telefone comer"
                  persistent-placeholdercial
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="12">
              <Field
                name="email"
                rules="required|email"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Email comercial"
                  persistent-placeholderl
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                  type="email"
                />
              </Field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <Field
                name="cep"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="CEP"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8">
              <Field
                name="street"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Rua"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="4">
              <Field
                name="number"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Número"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="neigborhood"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Bairro"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="complement"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Complemento"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="city"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Cidade"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12" sm="6">
              <Field
                name="state"
                rules="required|min:3|alpha_spaces"
                v-slot="{ field, errorMessage, value }"
              >
                <v-text-field
                  v-bind="field"
                  label="Estado"
                  persistent-placeholder
                  variant="solo-filled"
                  density="compact"
                  :error="!!errorMessage"
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
  
            <v-col cols="12" class="d-flex justify-end">
              <v-btn class="mt-4" color="primary">Salvar</v-btn>
            </v-col>
          </v-row>
          
        </v-form>
      </v-col>
    </v-row>
  </Form>
</template>