<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Form, Field } from '@/plugins/vee-validate'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/user.store'
import ProfilePersonalInformationForm from '../profile/ProfilePersonalInformationForm.vue';
import ProfileCompanyForm from '../profile/ProfileCompanyForm.vue';

const userStore = useUserStore();

onMounted(() => {
  if(userStore.user) {

  }
});

const { handleSubmit } = useForm()

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <ProfilePersonalInformationForm />

  <v-divider class="my-10" />

  <ProfileCompanyForm />

  <v-divider class="my-10"></v-divider>

  <v-row>
    <v-col cols="12" md="4" class="pr-md-6">
      <h5 class="text-subtitle-1 font-weight-medium">Alterar Senha</h5>
      <p class="text-body-2 text-medium-emphasis">
        Atualize a senha associada à sua conta.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <Form @submit="handleSubmit(onSubmit)">
        <v-row>
          <v-col cols="12">
            <Field
              name="senha atual"
              rules="required|min:6"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Senha Atual"
                :type="showCurrentPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showCurrentPassword = !showCurrentPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12">
            <Field
              name="nova senha"
              rules="required|min:6"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Nova Senha"
                :type="showNewPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNewPassword = !showNewPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12">
            <Field
              name="confirmação da nova senha"
              rules="required|confirmed:newPassword"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Confirmação da Nova Senha"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn type="submit" color="primary">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </Form>
    </v-col>
  </v-row>
</template>
