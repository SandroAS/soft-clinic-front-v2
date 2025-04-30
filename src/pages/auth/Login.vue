<script lang="ts" setup>
import { ref } from 'vue';
import logo from '@/assets/logo.png'

const email = ref('');
const password = ref('');
const formValid = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

const rules = {
  required: (v: string) => !!v || 'O campo é obrigatório',
  email: (v: string) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail inválido',
};

const submitForm = () => {
  if (formRef.value?.validate()) {
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    // Adicione lógica de autenticação aqui
  }
};

const forgotPassword = () => {
  console.log('Ir para recuperação de senha');
};

const register = () => {
  console.log('Ir para página de registro');
};
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-8" max-width="400" elevation="10" rounded="xl">
      <v-card-title class="justify-center mb-6">
        <v-img :src="logo" alt="Logo Soft Clinic" contain height="50" width="50" class="mr-2" />
        <span class="text-h5 font-weight-bold">Soft Clinic</span>
      </v-card-title>

      <v-form ref="formRef" v-model="formValid" @submit.prevent="submitForm">
        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-email"
          type="email"
          variant="solo-filled"
          density="comfortable"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Senha"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-lock"
          type="password"
          variant="solo-filled"
          density="comfortable"
        ></v-text-field>

        <div class="text-end mb-4">
          <v-btn variant="text" class="text-caption" @click="forgotPassword">
            Esqueceu sua senha?
          </v-btn>
        </div>

        <v-btn type="submit" color="primary" block class="mb-4">
          Entrar
          <v-icon end>mdi-login</v-icon>
        </v-btn>

        <div class="text-center">
          <span class="text-caption mr-1">Não tem uma conta?</span>
          <v-btn variant="outlined" color="teal" @click="register">
            Teste gratuitamente!
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
