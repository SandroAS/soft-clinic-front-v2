<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import profile_img_default from '@/assets/profile_img_default.png'
import { useUserStore } from '@/stores/user.store';
import type { ProfilePersonalInformation } from '@/types/profile/profile-personal-information.type';
import { Form, Field } from '@/plugins/vee-validate';
import { useSnackbarStore } from '@/stores/snackbar.store';

const userStore = useUserStore();
const snackbarStore = useSnackbarStore();

const personalInformationDefault = reactive<ProfilePersonalInformation>({
  name: userStore.user!.name,
  email: userStore.user!.email,
  cellphone: userStore.user!.cellphone,
  cpf: userStore.user!.cpf,
  profile_img_url: userStore.user!.profile_img_url
})

function uploadAvatar() {
  alert('Função de upload ainda não implementada')
}

async function onSubmit(formValues: Record<string, any>) {
  const personalInformation: ProfilePersonalInformation = formValues as ProfilePersonalInformation;
  try {
    await userStore.updateUser(personalInformation);
    snackbarStore.show('Usuário atualizado com sucesso!', 'success')
  } catch (err) {
    snackbarStore.show('Falha ao tentar atualizar usuário: '+err, 'success')
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4" class="pr-md-6">
      <h5 class="text-subtitle-1 font-weight-medium">Informações Pessoais</h5>
      <p class="text-body-2 text-medium-emphasis">
        Use um e-mail válido para receber notificações.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <Form @submit="onSubmit" :initial-values="personalInformationDefault">
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex align-center ga-4">
              <v-avatar size="120" class="border">
                <v-img :src="personalInformationDefault.profile_img_url || profile_img_default" alt="Avatar" />
              </v-avatar>
              <div>
                <v-btn variant="outlined" class="mb-2" @click="uploadAvatar">
                  Trocar Avatar
                </v-btn>
                <div class="text-caption text-medium-emphasis">
                  JPG, GIF ou PNG. Máx. 1MB.
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12" sm="6">
            <Field
              name="name"
              rules="required|min:3|alpha_spaces"
              v-slot="{ field, errorMessage, value }"
            >
              <v-text-field
                v-bind="field"
                label="Nome Completo"
                prepend-inner-icon="mdi-account"
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
              name="email"
              rules="required|email"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="E-mail"
                prepend-inner-icon="mdi-email"
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
              name="telefone"
              rules="required|numeric|min:10|max:11"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Telefone"
                v-mask="['(##) # ####-####', '(##) ####-####']"
                prepend-inner-icon="mdi-phone"
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
              name="cpf"
              rules="required|cpf"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="CPF"
                v-mask="'###.###.###-##'"
                prepend-inner-icon="mdi-card-account-details"
                persistent-placeholder
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
              />
            </Field>
          </v-col>
        </v-row>
      </Form>
    </v-col>

    <v-col cols="12" class="d-flex justify-end">
      <v-btn class="mt-4" color="primary">Salvar</v-btn>
    </v-col>
  </v-row>
</template>
