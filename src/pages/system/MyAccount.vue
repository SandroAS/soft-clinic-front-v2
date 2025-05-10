<script setup lang="ts">
import NotificationSettings from '@/components/system/myAccount/tabs/NotificationSettings.vue';
import PersonalInformations from '@/components/system/myAccount/tabs/PersonalInformations.vue';
import { ref } from 'vue'

const selectedTab = ref(0)
const tabs = [
  { name:'Informações Pessoais', value: 'informacoes-pessoais' },
  { name: 'Notificações', value: 'notificacao' },
  { name:'Assinatura', value: 'assinatura' },
  { name: 'Integrações', value: 'integracoes' }
]
</script>

<template>
  <v-container fluid>
    <v-tabs
      v-model="selectedTab"
      class="border-b"
    >
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :value="tab.value"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-container class="py-12">
      <v-tabs-window v-model="selectedTab">
        <v-tabs-window-item value="informacoes-pessoais">
          <PersonalInformations />
        </v-tabs-window-item>

        <v-tabs-window-item value="notificacao">
          <NotificationSettings />
        </v-tabs-window-item>

        <v-tabs-window-item value="assinatura">
          Assinatura
        </v-tabs-window-item>

        <v-tabs-window-item value="integracoes">
          Integrações
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </v-container>
</template>
