<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const token = route.query.token as string;
  const error = route.query.error as string | undefined;

  if (error) {
    console.error('Erro no callback do Google:', error);
    userStore.error = 'Falha na autenticação Google: ' + error;
    router.push('/login');
    return;
  }

  if (token) {
    localStorage.setItem('accessToken', token);

    try {
      await userStore.handleAuthSuccess(token);
      router.push('system/dashboard');
    } catch (err) {
      console.error('Erro ao buscar dados do usuário após login Google:', err);
    }
  } else {
    console.error('Token não encontrado na URL de callback. Possível erro de autenticação.');
    userStore.error = 'Nenhum token recebido do Google.';
    router.push('/login');
  }
});
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-8 text-center" max-width="400" elevation="10" rounded="xl">
      <v-progress-circular
        v-if="userStore.loading"
        indeterminate
        color="primary"
        size="64"
        width="6"
      ></v-progress-circular>
      <p v-else-if="userStore.error" class="text-red text-center">{{ userStore.error }}</p>
      <template v-else>
        <v-card-title class="mt-4">Autenticando...</v-card-title>
        <v-card-text>Por favor, aguarde enquanto processamos seu login.</v-card-text>
      </template>
    </v-card>
  </v-container>
</template>