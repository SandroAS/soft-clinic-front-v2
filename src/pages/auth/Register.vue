<script setup lang="ts">
import logo from '@/assets/logo.png'

const clinicTypes = [
  { label: 'Selecione uma opção', value: null, disabled: true },
  { label: 'Odontológica', value: 'odontologica' },
  { label: 'Psicologia (em breve)', value: 'psicologia', disabled: true },
  { label: 'Fisioterapia (em breve)', value: 'fisioterapia', disabled: true },
]
</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="pa-8" max-width="480" elevation="10">
      <v-img
        :src="logo"
        height="50"
        contain
        class="mb-6 mx-auto"
      />
      <div class="text-center mb-4">
        <h5 class="text-h6 font-weight-bold">Teste gratuitamente</h5>
        <p class="text-body-2">sem a necessidade de inserir seu cartão de crédito</p>
      </div>

      <v-form>
        <v-text-field
          label="Nome"
          prepend-inner-icon="mdi-account"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          label="E-mail"
          prepend-inner-icon="mdi-email"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          label="Telefone"
          prepend-inner-icon="mdi-phone"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          label="CPF"
          prepend-inner-icon="mdi-card-account-details"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        />
        <v-select
          label="Tipo de Clínica"
          :items="clinicTypes"
          item-title="label"
          item-value="value"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        >
          <template v-slot:item="{ props: itemProps, item }">
            <v-list-item v-bind="itemProps" :disabled="item.raw.disabled"></v-list-item>
          </template>
        </v-select>
        <v-text-field
          label="Senha"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="solo-filled"
          density="comfortable"
          class="mb-1"
        />
        <div class="text-caption text-red mb-3">Nível de segurança da senha: <strong>Baixo</strong></div>

        <v-text-field
          label="Confirmar senha"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="solo-filled"
          density="comfortable"
          class="mb-3"
        />

        <v-checkbox
          label="Eu concordo com o Termos de serviço e Política de Privacidade"
          class="mb-4"
        />

        <v-btn color="primary" block size="large" class="mb-2" rounded>
          Registrar
          <v-icon end>mdi-account-plus</v-icon>
        </v-btn>

        <div class="text-center text-body-2">
          Já possui uma conta? <a href="#" class="text-primary font-weight-medium">Login</a>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
